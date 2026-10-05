---
title: Install Pine for Unity
sidebar_label: Installation
description: Install the working Pine package with bundled Latin text, automatic setup and code-owned native Unity UI.
---

# Install Pine for Unity

Pine creates retained native uGUI from typed C# declarations. Import `Pine`, call `UI`, and keep durable state on a `MonoBehaviour` owner. No Inspector wiring is required for Pine's standard controls.

## Install the matching package

Select **Install package from disk** in Unity's Package Manager and choose the working checkout's `package.json`. Its package identifier is `com.kbenim.pine`; the current working distribution is `0.2.0`, with API base version `0.2.0`.

The manifest targets Unity `6000.3` and declares uGUI `2.0.0` plus Input System `1.20.1`. Unity's package resolution supplies its Editor's compatible uGUI core package. Use matching package/docs versions. The immutable [0.1.0 instructions](/docs/0.1.0/tutorials/installation/) describe that older release's `Pine.Pine` facade and API.

## What installation configures

Pine bundles an accented-Latin TMP font, distance-field shader, style sheet and line-breaking resources. When canonical `Resources/TMP Settings` is absent, Editor setup creates `Assets/PineGenerated/Resources/TMP Settings.asset`. Generated defaults reference project-owned copies under `Assets/PineGenerated/Resources/PineGenerated`, including the font, shader, text rules and their licenses. These copies preserve ordinary TMP defaults when Pine is removed; existing project settings and external assets are preserved. Pine uses `UI.DefaultFont` when supplied in code, then reuses the project-owned Latin copy, with the bundled Latin font as fallback. `UI.Font(...)` sets a font on a particular label.

The package includes Input System as a dependency. On supported desktop legacy-only projects, setup enables both backends so existing `UnityEngine.Input` gameplay keeps working; a restart completes the backend change. It waits for clean scenes and Unity's restart flow preserves unsaved work. In batch mode, restart the Editor process after setup changes the backend. New-input projects retain their configuration.

Android does not support Unity's Both configuration. Legacy-only Android projects retain their backend and Pine uses `StandaloneInputModule`; new-input projects use `InputSystemUIInputModule`. Pine records its own backend changes in `ProjectSettings/PineInput.json`; on Android it restores its recorded original legacy backend, and on desktop it restores coexistence. An externally configured unsupported Android Both configuration receives a diagnostic so unrelated gameplay is not silently rewritten.

Pine reuses compatible enabled external EventSystems without replacing their action assets or modules. With no external system it creates its own input objects. An incompatible external system receives a diagnostic instead of being overwritten. Explicitly parented canvases remain externally owned.

## Start without touching the Inspector

Put this code in `Welcome.cs`:

```csharp
using Pine;
using UnityEngine;

public sealed class Welcome : MonoBehaviour
{
    [RuntimeInitializeOnLoadMethod]
    private static void StartUI()
    {
        new GameObject("Welcome owner").AddComponent<Welcome>();
    }

    private void Start() => UI.Mount(Build);

    private Component Build()
    {
        return UI.Label("Hello from Pine", UI.Size(320, 48));
    }
}
```

The startup method creates the component in code. Its `Start()` mounts the tree once; `Build()` is just an ordinary helper method, which can also be inlined into the mount callback. Bindings update the retained tree. Scene unload or root destruction cleans up the mount. Disabling or destroying the creating component alone does not remove this separate tree. Keep the returned `Mount` when you need early disposal or an explicitly persistent canvas.

Continue with [the counter](counter.md), or browse the [complete API reference](../api/native-reference.md).
