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
            var count = UI.Source(0);
            var names = UI.Source(new List<string> { "Ada" });
            var title = UI.Source("Forest", StringComparer.OrdinalIgnoreCase);
            using var root = UI.Root(() =>
            {
                var doubled = UI.Derive(() => count.Value * 2);
                var normalized = UI.Derive(
                    () => title.Value,
                    StringComparer.OrdinalIgnoreCase
                );
                UI.Effect(() =>
                    Debug.Log($"{normalized.Value}: {doubled.Value}")
                );
                UI.Effect(() => Debug.Log($"Names: {names.Value.Count}"));
                UI.Batch(() =>
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
            var count = UI.Source(0);
            var incidental = UI.Source(100);
            using var root = UI.Root(() =>
            {
                var observer = UI.Effect(() =>
                {
                    Debug.Log($"Count: {count.Value}");
                    Debug.Log(UI.Untrack(() => incidental.Value));
                    UI.Untrack(() => Debug.Log(incidental.Value));
                    UI.Cleanup(() =>
                        Debug.Log("Previous effect execution ended.")
                    );
                });
                UI.Effect<int>(
                    previous =>
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
            Scope root = UI.Root(dispose =>
            {
                UI.Cleanup(() => Debug.Log("Root cleanup."));
                Debug.Log(
                    "Keep the supplied dispose callback for early teardown."
                );
            });
            root.Run(() => UI.Effect(() => Debug.Log("Late effect.")));
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
            var created = UI.Root<int>(dispose =>
            {
                UI.Cleanup(() => Debug.Log("Result-root cleanup."));
                return 7;
            });
            Debug.Log(created.Value);
            created.Scope.Dispose();
            using var outer = UI.Root(() =>
            {
                // An explicit nested Root is independent. Register its ownership deliberately.
                Scope inner = UI.Root(() =>
                    UI.Effect(() => Debug.Log("Independent root."))
                );
                UI.Cleanup(inner);
            });
        }

        public static void ContextProviders()
        {
            var fallback = UI.Source("Forest");
            var theme = UI.Context(fallback);
            var title = UI.Source("Night");
            var accent = UI.Source(Color.green);
            using var root = UI.Root(() =>
            {
                theme.Provide(
                    title,
                    () =>
                    {
                        var supplied = theme.Value;
                        UI.Effect(() => Debug.Log(supplied.Value));
                    }
                );
                var panel = theme.Provide(
                    title,
                    () =>
                        UI.Frame(
                            UI.Children(
                                UI.Label(() => theme.Value.Value),
                                UI.Button(
                                    "Change theme",
                                    () => title.Value = "Dawn"
                                )
                            )
                        )
                );
                var colors = UI.Context(Color.white);
                colors.Provide(
                    Color.green,
                    () =>
                        colors.Provide(
                            Color.blue,
                            () => Debug.Log(colors.Value)
                        )
                );
                using var independent = UI.Root(() =>
                    Debug.Log(theme.Value.Value)
                );
                // Independent roots see the fallback, rather than the provider above.
                title.Value = "Dusk";
                UI.Apply(panel, UI.Name("Themed panel"));
                accent.Value = Color.blue;
            });
        }

        public static void ReactiveInputs()
        {
            var source = UI.Source(24f);
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
            using var root = UI.Root(() =>
            {
                var derived = UI.Derive(() => source.Value + 2f);
                var spring = UI.Spring(getter);
                Value<float> implicitDerived = derived;
                Value<float> implicitSpring = spring;
                Debug.Log(UI.Read(literal));
                Debug.Log(UI.Read(getter));
                Debug.Log(UI.Read(source));
                Debug.Log(UI.Read(derived));
                Debug.Log(UI.Read(12f));
                UI.Label("Reactive font", UI.FontSize(implicitSource));
                source.Value = 28f;
                Debug.Log(UI.Read(implicitSpring));
            });
        }

        public static void NativeComposition()
        {
            var caption = UI.Source("Welcome");
            var size = UI.Source(new Vector2(360, 48));
            using var root = UI.Root(() =>
            {
                IProperty<TMP_Text> style = UI.Group<TMP_Text>(
                    UI.FontSize(28),
                    UI.Tint(Color.green)
                );
                var label = UI.Create<TextMeshProUGUI>(style);
                var clone = UI.Clone(label, UI.Name("Clone"), UI.Text("Copy"));
                var panel = UI.Frame(UI.Children(label, clone));
                UI.Apply(panel, UI.Size(size));
                panel.Bind(
                    () => size.Value,
                    (rect, value) => rect.anchoredPosition = value / 10f
                );
                UI.Apply(
                    label,
                    UI.Set<TextMeshProUGUI, float>(
                        "Character spacing",
                        (text, value) => text.characterSpacing = value,
                        2f
                    ),
                    UI.Set<TextMeshProUGUI, string>(
                        "Caption",
                        (text, value) => text.text = value,
                        () => caption.Value
                    ),
                    UI.Configure<TextMeshProUGUI>(text =>
                        text.alignment = TextAlignmentOptions.Center
                    ),
                    UI.Action<TextMeshProUGUI>(
                        text => Debug.Log(text.name),
                        priority: 2
                    )
                );
                caption.Value = "Changed";
                size.Value = new Vector2(480, 64);
            });
        }

        public static void LayoutAndGraphics()
        {
            var active = UI.Source(true);
            var enabled = UI.Source(true);
            var opacity = UI.Source(0.8f);
            var size = UI.Source(new Vector2(400, 200));
            var position = UI.Source(new Vector2(12, 24));
            using var root = UI.Root(() =>
            {
                var panel = UI.Column(
                    UI.Name("Panel"),
                    UI.Size(size),
                    UI.Position(position),
                    UI.Active(active),
                    UI.Opacity(opacity),
                    UI.Vertical(12),
                    UI.Children(
                        UI.Row(
                            UI.Horizontal(8),
                            UI.Children(
                                UI.Label(
                                    "Status",
                                    UI.Text(() => "Ready"),
                                    UI.FontSize(() => 24f),
                                    UI.PreferredSize(() => new Vector2(180, 48))
                                ),
                                UI.Button(
                                    () => "Continue",
                                    () => Debug.Log("Continue"),
                                    UI.Enabled(enabled),
                                    UI.PreferredSize(180, 48)
                                )
                            )
                        ),
                        UI.Frame(
                            UI.Size(400, 40),
                            UI.Children(
                                UI.Image(
                                    UI.Stretch(),
                                    UI.Tint(() => Color.green)
                                )
                            )
                        )
                    )
                );
                UI.Apply(
                    panel,
                    UI.Size(() => size.Value),
                    UI.Position(() => position.Value)
                );
                UI.Apply(panel, UI.Position(24, 32));
                // Pair forms and vector forms describe the same native size/position inputs.
                enabled.Value = false;
                opacity.Value = 0.5f;
                active.Value = false;
            });
        }

        public static void EventsAndTwoWayBindings()
        {
            var selected = UI.Source(false);
            var volume = UI.Source(0.25f);
            var name = UI.Source("Player");
            using var root = UI.Root(() =>
            {
                var toggle = UI.Toggle(selected);
                var slider = UI.Slider(volume);
                var input = UI.TextField(name);
                var button = UI.Button("Save", () => Debug.Log(name.Value));
                UI.Apply(
                    button,
                    UI.On<Button>(
                        target => target.onClick,
                        () => Debug.Log("Native click.")
                    )
                );
                UI.Apply(
                    slider,
                    UI.On<Slider, float>(
                        target => target.onValueChanged,
                        value => Debug.Log(value)
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
            using var root = UI.Root(() =>
            {
                var slider = UI.Create<Slider>(
                    UI.Changed<Slider, float>(
                        target => target.value,
                        value => Debug.Log($"Volume: {value}"),
                        target => target.onValueChanged
                    )
                );
                slider.value = 0.5f;
                var panel = UI.Frame(
                    UI.Changed<RectTransform, Vector2>(
                        target => target.sizeDelta,
                        value => Debug.Log($"Size: {value}")
                    )
                );
                panel.sizeDelta = new Vector2(240, 80);
                UI.Step(0); // Poll the explicitly observed size.
            });
        }

        public static void ReactiveChildren()
        {
            using var root = UI.Root(() =>
            {
                var first = UI.Label("First");
                var second = UI.Label("Second");
                var children = UI.Source<Component[]>(
                    new Component[] { first, second }
                );
                var panel = UI.Frame(UI.Children(() => children.Value));
                children.Value = new Component[] { second, first };
                var objects = UI.Source<IEnumerable<GameObject>>(
                    new[] { first.gameObject }
                );
                var other = UI.Frame(UI.Children(() => objects.Value));
                var parent = UI.Source<Transform>(panel);
                UI.Apply(other, UI.Parent(parent));
                parent.Value = null;
                objects.Value = Array.Empty<GameObject>();
                // The removed child detaches; this root still owns its destruction.
            });
        }

        public static void ConditionalBranches()
        {
            var visible = UI.Source(true);
            var selected = UI.Source("inventory");
            using var root = UI.Root(() =>
            {
                var message = UI.Show(
                    () => visible.Value,
                    () => UI.Label("Visible"),
                    () => UI.Label("Hidden")
                );
                var filtered = UI.Show<string, Component>(
                    () => selected.Value,
                    value => !string.IsNullOrEmpty(value),
                    (value, present) =>
                        new Branch<Component>(UI.Label(() => value.Value)),
                    present => new Branch<Component>(
                        UI.Label("Nothing selected")
                    )
                );
                var branches = new Dictionary<
                    string,
                    Func<ReadOnly<bool>, Branch<Component>>
                >
                {
                    ["inventory"] = present => new Branch<Component>(
                        UI.Label("Inventory")
                    ),
                    ["settings"] = present => new Branch<Component>(
                        UI.Label("Settings")
                    ),
                };
                var screen = UI.Switch<string, Component>(
                    () => selected.Value,
                    branches,
                    present => new Branch<Component>(UI.Label("Unknown screen"))
                );
                var factory = UI.Switch<string, Component>(
                    () => selected.Value,
                    key => UI.Label(key)
                );
                var fading = UI.Switch<string, Component>(
                    () => selected.Value,
                    (key, present) =>
                    {
                        var alpha = UI.Spring(
                            () => present.Value ? 1f : 0f,
                            period: 0.18
                        );
                        return new Branch<Component>(
                            UI.Label(key, UI.Opacity(alpha)),
                            exitDelay: 0.35
                        );
                    }
                );
                UI.Column(UI.Children(() => screen.Value));
                selected.Value = "settings";
                selected.Value = "inventory"; // Revives a departing branch before its timeout.
                visible.Value = false;
                UI.Step(0.4);
            });
        }

        public static void KeyedLists()
        {
            var items = UI.Source(new[] { "Ada", "Grace" });
            var records = UI.Source(
                new[] { new KeyValuePair<int, string>(101, "Potion") }
            );
            using var root = UI.Root(() =>
            {
                var positions = UI.Indexes<string, Component>(
                    () => items.Value,
                    (index, value) => UI.Label(() => $"{index}: {value.Value}")
                );
                var delayedPositions = UI.Indexes<string, Component>(
                    () => items.Value,
                    (index, value, present) =>
                        new Branch<Component>(UI.Label(() => value.Value), 0.2)
                );
                var keyed = UI.Indexes<int, string, Component>(
                    () => records.Value,
                    (id, value, present) =>
                        new Branch<Component>(
                            UI.Label(() => $"{id}: {value.Value}")
                        )
                );
                var values = UI.Values<string, Component>(
                    () => items.Value,
                    (value, index) =>
                        UI.Label(() => $"{index.Value + 1}: {value}"),
                    StringComparer.Ordinal
                );
                var delayedValues = UI.Values<string, Component>(
                    () => items.Value,
                    (value, index, present) =>
                        new Branch<Component>(
                            UI.Label(() => present.Value ? value : "Leaving"),
                            0.2
                        )
                );
                UI.Column(UI.Children(() => keyed.Value));
                items.Value = new[] { "Grace", "Ada" };
                records.Value = new[]
                {
                    new KeyValuePair<int, string>(101, "Potion x2"),
                };
                items.Value = new[] { "Ada" };
                UI.Step(0.3);
            });
        }

        public static void MountSurfaces()
        {
            using var overlay = UI.Mount(
                () => UI.Frame(UI.Children(UI.Label("Overlay"))),
                options: new CanvasOptions
                {
                    Name = "HUD Canvas",
                    ReferenceResolution = new Vector2(1920, 1080),
                    SortOrder = 100,
                }
            );
            using var objectRoot = UI.Mount(() =>
                UI.Frame(UI.Name("GameObject result")).gameObject
            );
            Debug.Log(overlay.Canvas);
            Debug.Log(overlay.Root);
            Debug.Log(overlay.Scope.IsDisposed);
            using var root = UI.Root(() =>
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
                            () =>
                                UI.Frame(
                                    UI.Children(UI.Label(mode.ToString()))
                                ),
                            canvas.transform
                        )
                    );
                }
            });
        }

        public static void SpringsAndSpaces()
        {
            var target = UI.Source(0f);
            var period = UI.Source(0.5);
            var damping = UI.Source(1.0);
            using var root = UI.Root(() =>
            {
                var spring = UI.Spring(
                    () => target.Value,
                    period: period,
                    dampingRatio: damping,
                    space: SpringSpaces.Float
                );
                target.Value = 200f;
                UI.Step(1.0 / 60);
                Debug.Log(spring.Value);
                spring.Control(position: 10f, velocity: 20f, impulse: 5f);
                UI.Step(1.0 / 60);
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
                using var root = UI.Root(() =>
                    UI.Frame(UI.Group<Component>(UI.Size(320, 160)))
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
