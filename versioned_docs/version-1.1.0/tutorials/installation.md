---
title: "Install Pine in Unity (Pine 1.1.0)"
sidebar_label: Installation
description: "Install Pine 1.1.0 with Unity Package Manager, a Git URL or a UPM archive. Check Unity, uGUI and Input System requirements and set up App.cs."
---

# Installation

In **Window → Package Manager → Install package from Git URL**, enter:

```text
https://github.com/pine-ui/package.git#v1.1.0
```

Alternatively download the [1.1.0 UPM archive](pathname:///packages/com.kbenim.pine-1.1.0.tgz) and [SHA-256 checksum](pathname:///packages/com.kbenim.pine-1.1.0.tgz.sha256), then use **Install package from tarball**. Local contributors can select `package.json` with **Install package from disk**.

The declared baseline remains Unity 6000.3, uGUI 2.0.0 and Input System 1.20.1. Unity resolves its compatible uGUI core package. Native additions have version gates: RaycastReceiver (2.5), SafeArea and LayoutElement max dimensions (2.6), TMP advanced text (2.7), Canvas reflection probes (Unity 6000.4).

Create one `App.cs` with a public static `View Mount()` method, or import the Counter sample. Pine generates startup and supplies a canvas and compatible EventSystem. An explicit `P.Canvas` root reuses that canvas. TMP defaults are installed only when missing; existing resources and external input ownership are preserved.

[Build the counter](counter.md). [Compatibility evidence](https://github.com/pine-ui/package/blob/main/COMPATIBILITY.md).

## Create your first interface

1. Wait for Package Manager to finish resolving packages and for Unity to finish compiling.
2. Create `App.cs` in your project's scripts folder using the complete [counter example](counter.md), or import the Counter sample. Use one entry point; importing the sample and keeping another `App` declaration causes a duplicate C# type.
3. Enter Play mode. The counter should start at zero, Increment should increase it, and Reset should become available after the first increment.

The returned `View` describes native uGUI objects. Pine mounts those objects and owns their reactive bindings. You do not need to attach a separate behaviour to every button or text label. The [startup reference](../api/startup-reference.md) lists compiler-generated startup support; the [mount reference](../api/mount-reference.md) covers explicit mounting and canvas options.

## Troubleshoot installation

| Symptom | Check |
| --- | --- |
| `using Pine;` does not resolve | Confirm that Package Manager installed Pine and fix the first Unity Console compilation error. Check the package and Unity version against the baseline above. |
| Duplicate `App` or `Mount` errors | Keep one counter entry point. Remove the duplicate script you imported or copied. |
| The interface has no visible size | Follow the counter's explicit `sizeDelta` and `LayoutElement` settings. Native layout defaults do not automatically enable child sizing. |
| A native prop is unavailable | Check its Unity or uGUI version gate in the [native controls reference](../api/controls-reference.md). Installing Pine does not add a newer Unity API to an older editor. |

For the state update model, continue with [reactive props](reactivity.md). For your own components, follow [reusable C# components](components.md).
