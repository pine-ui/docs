using System;
using System.Collections.Generic;
using System.Linq;
using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    // Run in a configured Unity project, on the main thread.
    // These examples use explicit roots and dispose all their owned resources.
    public static class PineFeatureExamples
    {
        public static void Run()
        {
            SourcesAndDerived();
            EffectHistory();
            ScopeOwnership();
            ContextProviders();
            ReactiveInputs();
            NativeComposition();
            LayoutAndGraphics();
            EventsAndTwoWayBindings();
            ChangedAndPolling();
            ReactiveChildren();
            ConditionalBranches();
            KeyedLists();
            MountSurfaces();
            SpringsAndSpaces();
            CreationFlags();
            Debug.Log("Pine feature examples completed.");
        }

        public static void SourcesAndDerived()
        {
            var count = UI.Source(value: 0);
            var names = UI.Source(value: new List<string> { "Ada" });
            var title = UI.Source(
                value: "Forest",
                comparer: StringComparer.OrdinalIgnoreCase
            );
            using var root = UI.Root(build: () =>
            {
                var doubled = UI.Derive(compute: () => count.Value * 2);
                var normalized = UI.Derive(
                    compute: () => title.Value,
                    comparer: StringComparer.OrdinalIgnoreCase
                );
                UI.Effect(action: () =>
                    Debug.Log($"{normalized.Value}: {doubled.Value}")
                );
                UI.Effect(action: () =>
                    Debug.Log($"Names: {names.Value.Count}")
                );
                UI.Batch(action: () =>
                {
                    count.Set(2);
                    count.Value = 3;
                    Debug.Log(doubled.Value); // Current even before the batch ends.
                });
                Debug.Log(count.Peek()); // Does not register a dependency.
                names.Value.Add("Grace");
                names.Notify(); // Explicit notification after an in-place edit.
                title.Value = "FOREST"; // Suppressed by this source's comparer.
                doubled.Dispose();
                normalized.Dispose();
            });
        }

        public static void EffectHistory()
        {
            var count = UI.Source(value: 0);
            var incidental = UI.Source(value: 100);
            using var root = UI.Root(build: () =>
            {
                var observer = UI.Effect(action: () =>
                {
                    Debug.Log($"Count: {count.Value}");
                    Debug.Log(UI.Untrack(() => incidental.Value));
                    UI.Untrack(() => Debug.Log(incidental.Value));
                    UI.Cleanup(cleanup: () =>
                        Debug.Log("Previous effect execution ended.")
                    );
                });
                UI.Effect<int>(
                    action: previous =>
                    {
                        Debug.Log($"{previous} -> {count.Value}");
                        return count.Value;
                    },
                    initial: -1
                );
                count.Value = 1;
                incidental.Value = 200; // Does not rerun the untracked reads.
                observer.Dispose();
                count.Value = 2;
            });
        }

        public static void ScopeOwnership()
        {
            Scope root = UI.Root(build: dispose =>
            {
                UI.Cleanup(cleanup: () => Debug.Log("Root cleanup."));
                Debug.Log(
                    "Keep the supplied dispose callback for early teardown."
                );
            });
            root.Run(() => UI.Effect(action: () => Debug.Log("Late effect.")));
            int result = root.Run(() => 42);
            root.Own(
                new CallbackResource(() => Debug.Log($"Owned result: {result}"))
            );
            root.Run(() =>
                UI.Cleanup(
                    new CallbackResource(() => Debug.Log("Disposable cleanup."))
                )
            );
            root.Run(() => UI.Cleanup(new GameObject("Owned Unity object")));
            root.Dispose();
            Debug.Log(root.IsDisposed);
            root.Dispose(); // Idempotent.
            var created = UI.Root<int>(build: dispose =>
            {
                UI.Cleanup(cleanup: () => Debug.Log("Result-root cleanup."));
                return 7;
            });
            Debug.Log(created.Value);
            created.Scope.Dispose();
            using var outer = UI.Root(build: () =>
            {
                // An explicit nested Root is independent. Register its ownership deliberately.
                Scope inner = UI.Root(build: () =>
                    UI.Effect(action: () => Debug.Log("Independent root."))
                );
                UI.Cleanup(inner);
            });
        }

        public static void ContextProviders()
        {
            var fallback = UI.Source(value: "Forest");
            var theme = UI.Context(fallback: fallback);
            var title = UI.Source(value: "Night");
            var accent = UI.Source(value: Color.green);
            using var root = UI.Root(build: () =>
            {
                theme.Provide(
                    title,
                    () =>
                    {
                        var supplied = theme.Value;
                        UI.Effect(action: () => Debug.Log(supplied.Value));
                    }
                );
                var panel = theme.Provide(
                    title,
                    () =>
                        UI.Frame(
                            UI.Children(
                                UI.Label(text: () => theme.Value.Value),
                                UI.Button(
                                    text: "Change theme",
                                    click: () => title.Value = "Dawn"
                                )
                            )
                        )
                );
                var colors = UI.Context(fallback: Color.white);
                colors.Provide(
                    Color.green,
                    () =>
                        colors.Provide(
                            Color.blue,
                            () => Debug.Log(colors.Value)
                        )
                );
                using var independent = UI.Root(build: () =>
                    Debug.Log(theme.Value.Value)
                );
                // Independent roots see the fallback, rather than the provider above.
                title.Value = "Dusk";
                UI.Apply(target: panel, UI.Name(name: "Themed panel"));
                accent.Value = Color.blue;
            });
        }

        public static void ReactiveInputs()
        {
            var source = UI.Source(value: 24f);
            Func<float> getter = () => source.Value;
            Value<float> literal = new Value<float>(18f);
            Value<float> dynamicValue = new Value<float>(getter);
            Value<float> implicitLiteral = 20f;
            Value<float> implicitGetter = getter;
            Value<float> implicitSource = source;
            Debug.Log(
                $"Literal dynamic: {literal.IsDynamic}; getter dynamic: {dynamicValue.IsDynamic}"
            );
            Debug.Log(dynamicValue.Read());
            using var root = UI.Root(build: () =>
            {
                var derived = UI.Derive(compute: () => source.Value + 2f);
                var spring = UI.Spring(target: getter);
                Value<float> implicitDerived = derived;
                Value<float> implicitSpring = spring;
                Debug.Log(UI.Read(literal));
                Debug.Log(UI.Read(getter));
                Debug.Log(UI.Read(source));
                Debug.Log(UI.Read(derived));
                Debug.Log(UI.Read(12f));
                UI.Label(
                    text: "Reactive font",
                    UI.FontSize(size: implicitSource)
                );
                source.Value = 28f;
                Debug.Log(UI.Read(implicitSpring));
            });
        }

        public static void NativeComposition()
        {
            var caption = UI.Source(value: "Welcome");
            var size = UI.Source(value: new Vector2(x: 360, y: 48));
            using var root = UI.Root(build: () =>
            {
                IProperty<TMP_Text> style = UI.Group<TMP_Text>(
                    UI.FontSize(size: 28),
                    UI.Tint(color: Color.green)
                );
                var label = UI.Create<TextMeshProUGUI>(style);
                var clone = UI.Clone(
                    template: label,
                    UI.Name(name: "Clone"),
                    UI.Text(text: "Copy")
                );
                var panel = UI.Frame(UI.Children(label, clone));
                UI.Apply(target: panel, UI.Size(size: size));
                panel.Bind(
                    () => size.Value,
                    (rect, value) => rect.anchoredPosition = value / 10f
                );
                UI.Apply(
                    target: label,
                    UI.Set<TextMeshProUGUI, float>(
                        name: "Character spacing",
                        set: (text, value) => text.characterSpacing = value,
                        value: 2f
                    ),
                    UI.Set<TextMeshProUGUI, string>(
                        name: "Caption",
                        set: (text, value) => text.text = value,
                        read: () => caption.Value
                    ),
                    UI.Configure<TextMeshProUGUI>(configure: text =>
                        text.alignment = TextAlignmentOptions.Center
                    ),
                    UI.Action<TextMeshProUGUI>(
                        action: text => Debug.Log(text.name),
                        priority: 2
                    )
                );
                caption.Value = "Changed";
                size.Value = new Vector2(x: 480, y: 64);
            });
        }

        public static void LayoutAndGraphics()
        {
            var active = UI.Source(value: true);
            var enabled = UI.Source(value: true);
            var opacity = UI.Source(value: 0.8f);
            var size = UI.Source(value: new Vector2(x: 400, y: 200));
            var position = UI.Source(value: new Vector2(x: 12, y: 24));
            using var root = UI.Root(build: () =>
            {
                var panel = UI.Column(
                    UI.Name(name: "Panel"),
                    UI.Size(size: size),
                    UI.Position(position: position),
                    UI.Active(active: active),
                    UI.Opacity(opacity: opacity),
                    UI.Vertical(12),
                    UI.Children(
                        UI.Row(
                            UI.Horizontal(8),
                            UI.Children(
                                UI.Label(
                                    text: "Status",
                                    UI.Text(text: () => "Ready"),
                                    UI.FontSize(size: () => 24f),
                                    UI.PreferredSize(size: () =>
                                        new Vector2(x: 180, y: 48)
                                    )
                                ),
                                UI.Button(
                                    text: () => "Continue",
                                    click: () => Debug.Log("Continue"),
                                    UI.Enabled(enabled: enabled),
                                    UI.PreferredSize(width: 180, height: 48)
                                )
                            )
                        ),
                        UI.Frame(
                            UI.Size(width: 400, height: 40),
                            UI.Children(
                                UI.Image(
                                    UI.Stretch(),
                                    UI.Tint(color: () => Color.green)
                                )
                            )
                        )
                    )
                );
                UI.Apply(
                    target: panel,
                    UI.Size(size: () => size.Value),
                    UI.Position(position: () => position.Value)
                );
                UI.Apply(target: panel, UI.Position(x: 24, y: 32));
                // Pair forms and vector forms describe the same native size/position inputs.
                enabled.Value = false;
                opacity.Value = 0.5f;
                active.Value = false;
            });
        }

        public static void EventsAndTwoWayBindings()
        {
            var selected = UI.Source(value: false);
            var volume = UI.Source(value: 0.25f);
            var name = UI.Source(value: "Player");
            using var root = UI.Root(build: () =>
            {
                var toggle = UI.Toggle(value: selected);
                var slider = UI.Slider(value: volume);
                var input = UI.TextField(value: name);
                var button = UI.Button(
                    text: "Save",
                    click: () => Debug.Log(name.Value)
                );
                UI.Apply(
                    target: button,
                    UI.On<Button>(
                        select: target => target.onClick,
                        action: () => Debug.Log("Native click.")
                    )
                );
                UI.Apply(
                    target: slider,
                    UI.On<Slider, float>(
                        select: target => target.onValueChanged,
                        action: value => Debug.Log(value)
                    )
                );
                toggle.isOn = true;
                slider.value = 0.75f;
                input.text = "Explorer";
                button.onClick.Invoke();
                Debug.Log($"{selected.Value}, {volume.Value}, {name.Value}");
                selected.Value = false;
                volume.Value = 0.5f;
                name.Value = "Ranger";
            });
        }

        public static void ChangedAndPolling()
        {
            using var root = UI.Root(build: () =>
            {
                var slider = UI.Create<Slider>(
                    UI.Changed<Slider, float>(
                        read: target => target.value,
                        changed: value => Debug.Log($"Volume: {value}"),
                        events: target => target.onValueChanged
                    )
                );
                slider.value = 0.5f;
                var panel = UI.Frame(
                    UI.Changed<RectTransform, Vector2>(
                        read: target => target.sizeDelta,
                        changed: value => Debug.Log($"Size: {value}")
                    )
                );
                panel.sizeDelta = new Vector2(x: 240, y: 80);
                UI.Step(deltaTime: 0); // Poll the explicitly observed size.
            });
        }

        public static void ReactiveChildren()
        {
            using var root = UI.Root(build: () =>
            {
                var first = UI.Label(text: "First");
                var second = UI.Label(text: "Second");
                var children = UI.Source<Component[]>(
                    value: new Component[] { first, second }
                );
                var panel = UI.Frame(UI.Children(read: () => children.Value));
                children.Value = new Component[] { second, first };
                var objects = UI.Source<IEnumerable<GameObject>>(
                    value: new[] { first.gameObject }
                );
                var other = UI.Frame(UI.Children(read: () => objects.Value));
                var parent = UI.Source<Transform>(value: panel);
                UI.Apply(target: other, UI.Parent(parent: parent));
                parent.Value = null;
                objects.Value = Array.Empty<GameObject>();
                // The removed child detaches; this root still owns its destruction.
            });
        }

        public static void ConditionalBranches()
        {
            var visible = UI.Source(value: true);
            var selected = UI.Source(value: "inventory");
            using var root = UI.Root(build: () =>
            {
                var message = UI.Show(
                    () => visible.Value,
                    () => UI.Label(text: "Visible"),
                    () => UI.Label(text: "Hidden")
                );
                var filtered = UI.Show<string, Component>(
                    read: () => selected.Value,
                    truthy: value => !string.IsNullOrEmpty(value),
                    build: (value, present) =>
                        new Branch<Component>(
                            UI.Label(text: () => value.Value)
                        ),
                    fallback: present => new Branch<Component>(
                        UI.Label(text: "Nothing selected")
                    )
                );
                var branches = new Dictionary<
                    string,
                    Func<ReadOnly<bool>, Branch<Component>>
                >
                {
                    ["inventory"] = present => new Branch<Component>(
                        UI.Label(text: "Inventory")
                    ),
                    ["settings"] = present => new Branch<Component>(
                        UI.Label(text: "Settings")
                    ),
                };
                var screen = UI.Switch<string, Component>(
                    select: () => selected.Value,
                    branches: branches,
                    fallback: present => new Branch<Component>(
                        UI.Label(text: "Unknown screen")
                    )
                );
                var factory = UI.Switch<string, Component>(
                    select: () => selected.Value,
                    build: key => UI.Label(text: key)
                );
                var fading = UI.Switch<string, Component>(
                    select: () => selected.Value,
                    build: (key, present) =>
                    {
                        var alpha = UI.Spring(
                            target: () => present.Value ? 1f : 0f,
                            period: 0.18
                        );
                        return new Branch<Component>(
                            UI.Label(text: key, UI.Opacity(opacity: alpha)),
                            exitDelay: 0.35
                        );
                    }
                );
                UI.Column(UI.Children(read: () => screen.Value));
                selected.Value = "settings";
                selected.Value = "inventory"; // Revives a departing branch before its timeout.
                visible.Value = false;
                UI.Step(deltaTime: 0.4);
            });
        }

        public static void KeyedLists()
        {
            var items = UI.Source(value: new[] { "Ada", "Grace" });
            var records = UI.Source(
                value: new[] { new KeyValuePair<int, string>(101, "Potion") }
            );
            using var root = UI.Root(build: () =>
            {
                var positions = UI.Indexes<string, Component>(
                    read: () => items.Value,
                    build: (index, value) =>
                        UI.Label(text: () => $"{index}: {value.Value}")
                );
                var delayedPositions = UI.Indexes<string, Component>(
                    read: () => items.Value,
                    build: (index, value, present) =>
                        new Branch<Component>(
                            UI.Label(text: () => value.Value),
                            0.2
                        )
                );
                var keyed = UI.Indexes<int, string, Component>(
                    read: () => records.Value,
                    build: (id, value, present) =>
                        new Branch<Component>(
                            UI.Label(text: () => $"{id}: {value.Value}")
                        )
                );
                var values = UI.Values<string, Component>(
                    read: () => items.Value,
                    build: (value, index) =>
                        UI.Label(text: () => $"{index.Value + 1}: {value}"),
                    comparer: StringComparer.Ordinal
                );
                var delayedValues = UI.Values<string, Component>(
                    read: () => items.Value,
                    build: (value, index, present) =>
                        new Branch<Component>(
                            UI.Label(text: () =>
                                present.Value ? value : "Leaving"
                            ),
                            0.2
                        )
                );
                UI.Column(UI.Children(read: () => keyed.Value));
                items.Value = new[] { "Grace", "Ada" };
                records.Value = new[]
                {
                    new KeyValuePair<int, string>(101, "Potion x2"),
                };
                items.Value = new[] { "Ada" };
                UI.Step(deltaTime: 0.3);
            });
        }

        public static void MountSurfaces()
        {
            using var overlay = UI.Mount(
                () => UI.Frame(UI.Children(UI.Label(text: "Overlay"))),
                options: new CanvasOptions
                {
                    Name = "HUD Canvas",
                    ReferenceResolution = new Vector2(x: 1920, y: 1080),
                    SortOrder = 100,
                }
            );
            using var objectRoot = UI.Mount(component: () =>
                UI.Frame(UI.Name(name: "GameObject result")).gameObject
            );
            Debug.Log(overlay.Canvas);
            Debug.Log(overlay.Root);
            Debug.Log(overlay.Scope.IsDisposed);
            using var root = UI.Root(build: () =>
            {
                var cameraObject = new GameObject("UI camera", typeof(Camera));
                UI.Cleanup(cameraObject);
                foreach (
                    RenderMode mode in new[]
                    {
                        RenderMode.ScreenSpaceCamera,
                        RenderMode.WorldSpace,
                    }
                )
                {
                    var canvasObject = new GameObject(
                        "External Canvas",
                        typeof(RectTransform),
                        typeof(Canvas),
                        typeof(CanvasScaler),
                        typeof(GraphicRaycaster)
                    );
                    UI.Cleanup(canvasObject);
                    var canvas = canvasObject.GetComponent<Canvas>();
                    canvas.renderMode = mode;
                    canvas.worldCamera = cameraObject.GetComponent<Camera>();
                    UI.Cleanup(
                        UI.Mount(
                            component: () =>
                                UI.Frame(
                                    UI.Children(UI.Label(text: mode.ToString()))
                                ),
                            parent: canvas.transform
                        )
                    );
                }
            });
        }

        public static void SpringsAndSpaces()
        {
            var target = UI.Source(value: 0f);
            var period = UI.Source(value: 0.5);
            var damping = UI.Source(value: 1.0);
            using var root = UI.Root(build: () =>
            {
                var spring = UI.Spring(
                    target: () => target.Value,
                    period: period,
                    dampingRatio: damping,
                    space: SpringSpaces.Float
                );
                target.Value = 200f;
                UI.Step(deltaTime: 1.0 / 60);
                Debug.Log(spring.Value);
                spring.Control(position: 10f, velocity: 20f, impulse: 5f);
                UI.Step(deltaTime: 1.0 / 60);
                spring.Value = 40f; // Immediate publication and zero velocity.
                period.Value = 0.25;
                damping.Value = 0.75;
                UI.Spring(() => 1.0, space: SpringSpaces.Double);
                UI.Spring(
                    () => new double[] { 1, 2 },
                    space: SpringSpaces.Array
                );
                UI.Spring(() => Vector2.zero, space: UnitySpringSpaces.Vector2);
                UI.Spring(() => Vector3.zero, space: UnitySpringSpaces.Vector3);
                UI.Spring(() => Vector4.zero, space: UnitySpringSpaces.Vector4);
                UI.Spring(() => Color.green, space: UnitySpringSpaces.Color);
                UI.Spring(
                    () => new Rect(0, 0, 100, 40),
                    space: UnitySpringSpaces.Rect
                );
                UI.Spring(
                    () => Quaternion.identity,
                    space: UnitySpringSpaces.Quaternion
                );
                UI.Spring(
                    () => new Pose(Vector3.zero, Quaternion.identity),
                    space: UnitySpringSpaces.Pose
                );
                var pairSpace = new SpringSpace<(double X, double Y)>(
                    value => new double[] { value.X, value.Y },
                    lanes => (lanes[0], lanes[1])
                );
                var pair = UI.Spring(
                    () => (X: 10.0, Y: 20.0),
                    space: pairSpace
                );
                double[] lanes = pairSpace.Pack(pair.Value);
                Debug.Log(pairSpace.Unpack(lanes));
                spring.Dispose();
            });
        }

        public static void CreationFlags()
        {
            bool strict = UI.Strict;
            bool defaults = UI.Defaults;
            bool defer = UI.DeferNestedProperties;
            try
            {
                UI.Strict = true;
                UI.Defaults = false;
                UI.DeferNestedProperties = false;
                using var root = UI.Root(build: () =>
                    UI.Frame(
                        UI.Group<Component>(UI.Size(width: 320, height: 160))
                    )
                );
                Debug.Log(UI.Version);
            }
            finally
            {
                UI.Strict = strict;
                UI.Defaults = defaults;
                UI.DeferNestedProperties = defer;
            }
        }

        private sealed class CallbackResource : IDisposable
        {
            private Action _callback;

            internal CallbackResource(Action callback) => _callback = callback;

            public void Dispose()
            {
                Action callback = _callback;
                _callback = null;
                callback?.Invoke();
            }
        }
    }
}
