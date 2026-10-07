---
title: "Install Pine in Unity (Pine 1.2.0)"
sidebar_label: Installation
description: "Install Pine 1.2.0 with Unity Package Manager, a Git URL or a UPM archive. Check Unity, uGUI and Input System requirements and set up App.cs."
---

# Installation

In **Window → Package Manager → Install package from Git URL**, enter:

```text
https://github.com/pine-ui/package.git#v1.2.0
```

Existing users must add their renderer import when upgrading to 1.2.0; this namespace change is breaking.

Use `using Pine;` and either `using Pine.uGUI;` or `using Pine.UIToolkit;`. The selected renderer supplies `P` and `View`; the reactive types remain shared.

Alternatively, download the [1.2.0 UPM archive](pathname:///packages/com.kbenim.pine-1.2.0.tgz) ([SHA-256](pathname:///packages/com.kbenim.pine-1.2.0.tgz.sha256)) and use **Install package from tarball**. Older packages retain their versioned documentation and downloads.

The declared baseline remains Unity 6000.3, uGUI 2.0.0 and Input System 1.20.1. Unity resolves its compatible uGUI core package. Native additions have version gates: RaycastReceiver (2.5), SafeArea and LayoutElement max dimensions (2.6), TMP advanced text (2.7), Canvas reflection probes (Unity 6000.4).

Create one `App.cs` with a public static `View Mount()` method, or import one counter sample. Pine generates startup. uGUI receives a native canvas and compatible EventSystem; UI Toolkit receives a native UIDocument, panel settings and theme. For UI Toolkit, follow [the native UI Toolkit guide](../guides/ui-toolkit.md).

[Build the counter](counter.md). [Compatibility evidence](https://github.com/pine-ui/package/blob/main/COMPATIBILITY.md).

## Create your first interface

1. Wait for Package Manager to finish resolving packages and for Unity to finish compiling.
2. Create `App.cs` in your project's scripts folder using the complete [counter example](counter.md), or import the Counter sample. Use one entry point; importing the sample and keeping another `App` declaration causes a duplicate C# type.
3. Enter Play mode. The counter should start at zero, Increment should increase it, and Reset should become available after the first increment.

The returned `View` describes native uGUI objects. Pine mounts those objects and owns their reactive bindings. You do not need to attach a separate behaviour to every button or text label. The [startup reference](../api/startup-reference.md) lists compiler-generated startup support; the [mount reference](../api/mount-reference.md) covers explicit mounting and canvas options.

## Troubleshoot installation

| Symptom | Check |
| --- | --- |
| `using Pine;` or the renderer import does not resolve | Confirm that Package Manager installed Pine and fix the first Unity Console compilation error. Check the package and Unity version against the baseline above. |
| Duplicate `App` or `Mount` errors | Keep one counter entry point. Remove the duplicate script you imported or copied. |
| The interface has no visible size | Follow the counter's explicit `sizeDelta` and `LayoutElement` settings. Native layout defaults do not automatically enable child sizing. |
| A native prop is unavailable | Check its Unity or uGUI version gate in the [native controls reference](../api/controls-reference.md). Installing Pine does not add a newer Unity API to an older editor. |

For the state update model, continue with [reactive props](reactivity.md). For your own components, follow [reusable C# components](components.md).
