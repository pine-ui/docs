---
title: Install Pine for Unity
sidebar_label: Installation
description: Install the working Pine package with bundled Latin text, automatic setup and code-owned native Unity UI.
---

# Install Pine for Unity

Pine creates retained native uGUI from typed C# declarations. Import `Pine` and return your interface from `App.Mount()` in `App.cs`. No Inspector wiring is required for Pine's standard controls.

## Install the matching package

In Unity Package Manager, select **Install package from Git URL** and enter:

~~~text
https://github.com/pine-ui/package.git#v1.0.0
~~~

Alternatively, select **Install package from tarball** and use [com.kbenim.pine-1.0.0.tgz](/packages/com.kbenim.pine-1.0.0.tgz), checking [its SHA256 checksum](/packages/com.kbenim.pine-1.0.0.tgz.sha256). Package identifier: com.kbenim.pine. Match your installed package to the selected documentation version.

## Supported versions and prerequisites

| Package / API | Unity Editor | uGUI | Input System | Evidence |
| --- | --- | --- | --- | --- |
| Pine 1.0.0 | 6000.3.25f1 (Unity 6.3 LTS) | 2.0.0 | 1.20.1 | macOS Editor checks: native controls, automatic startup, behaviour composition, setup and cleanup |
| Pine 1.0.0 | 6000.6.4f1 (Unity 6.6) | 2.6.0 | 1.20.1 | macOS Editor checks: native controls, automatic startup, behaviour composition, setup and cleanup |

The package declares **Unity 6000.3 as its minimum**. The rows above are the exact recorded test tuples; they establish support within those checks. A stripped macOS Mono player was also measured on an Apple M4 Pro. See the [compatibility summary](https://pine-ui.com/compatibility/1.0.0.md) for the verified scope.

Before installing:

- Use a Unity 6.3-or-newer project with C# 9-compatible source. Unity defaults to the .NET Standard 2.1 API profile; no separate .NET SDK is needed to use Pine.
- Let Package Manager resolve the manifest's Input System dependency and the Editor's matching uGUI core package, which includes TextMeshPro.
- Allow the setup's Editor restart when input handling changes. Follow the platform-specific input behavior below for existing gameplay.
- Build and update Pine UI on Unity's main thread. Supply the camera in code for camera-space/world-space mounts.
- The bundled font covers accented Latin. Supply additional TMP fonts and fallback tables in code for other glyph sets.

Unity documents the [C# compiler](https://docs.unity3d.com/6000.3/Documentation/Manual/csharp-compiler.html), [API profiles](https://docs.unity3d.com/6000.3/Documentation/Manual/dotnet-profile-support.html) and [Editor-matched uGUI package](https://docs.unity3d.com/6000.6/Documentation/Manual/com.unity.ugui.html).


## What installation configures

Pine bundles an accented-Latin TMP font, distance-field shader, style sheet and line-breaking resources. When canonical `Resources/TMP Settings` is absent, Editor setup creates `Assets/PineGenerated/Resources/TMP Settings.asset`. Generated defaults reference project-owned copies under `Assets/PineGenerated/Resources/PineGenerated`, including the font, shader, text rules and their licenses. These copies preserve ordinary TMP defaults when Pine is removed; existing project settings and external assets are preserved. Pine uses `UI.DefaultFont` when supplied in code, then reuses the project-owned Latin copy, with the bundled Latin font as fallback. `UI.Font(...)` sets a font on a particular label.

The package includes Input System as a dependency. On supported desktop legacy-only projects, setup enables both backends so existing `UnityEngine.Input` gameplay keeps working; a restart completes the backend change. It waits for clean scenes and Unity's restart flow preserves unsaved work. In batch mode, restart the Editor process after setup changes the backend. New-input projects retain their configuration.

Android does not support Unity's Both configuration. Legacy-only Android projects retain their backend and Pine uses `StandaloneInputModule`; new-input projects use `InputSystemUIInputModule`. Pine records its own backend changes in `ProjectSettings/PineInput.json`; on Android it restores its recorded original legacy backend, and on desktop it restores coexistence. An externally configured unsupported Android Both configuration receives a diagnostic so unrelated gameplay is not silently rewritten.

Pine reuses compatible enabled external EventSystems without replacing their action assets or modules. With no external system it creates its own input objects. An incompatible external system receives a diagnostic instead of being overwritten. Explicitly parented canvases remain externally owned.

## Start without touching the Inspector

Create **App.cs** under Assets with a public static `App` class and a parameterless `Mount()` method:

```csharp title="App.cs"
using Pine;
using UnityEngine;

public static class App
{
    public static RectTransform Mount() =>
        UI.Column(
            gap: 12,
            UI.Label(text: "Hello from Pine"),
            UI.Button(text: "Continue", click: () => Debug.Log("Clicked"))
        );
}
```

Press Play. Pine's bundled source generator creates the startup call and mounts the returned tree after the initial scene loads. You do not attach a script, create an owner, declare an attribute, write `Start()`, or call `UI.Mount` in this entry. No separate .NET SDK or generator installation is required.

Declare exactly one application entry per project. `App.cs` may live in a namespace or a runtime assembly definition referencing Pine. Compiler diagnostics report invalid entries; duplicate entries across runtime assemblies are rejected before Play or a player build. An existing unrelated `App` class in a differently named file is not an entry.

The Pine-owned canvas persists across scenes by default. For scene-lived UI, optionally add this property to `App`:

```csharp
public static CanvasOptions Options => new CanvasOptions { Persistent = false };
```

`App.Options` also accepts code-configured scaling, safe areas and rendering modes; see [canvas options](../api/mount-reference.md). A native tree is the simple default. An advanced `App.Mount()` may instead return a `Mount` created with `UI.Mount` when it needs an external parent or explicit ownership; pass options to that mount instead of declaring `App.Options`. External parents remain owned by your project.

Reusable components return native UI and never start themselves. Plain component functions are sufficient for UI-only code. Components needing Unity callbacks declare an instance `Create(...)` method on a `MonoBehaviour`; Pine generates typed `Components.Name(...)` calls that create and clean up those instances. See [components](components.md).

Continue with [the counter](counter.md), or browse the [complete API reference](../api/native-reference.md).
