---
title: Install Pine for Unity
sidebar_label: Installation
description: Install Pine 0.1.0 through Unity Package Manager, configure text and input, and start building reactive Unity UI in C#.
---

# Install Pine for Unity

Pine **0.1.0** builds retained uGUI in C# with native Unity components and explicit typed reactive state.

## Install the package

In Unity's Package Manager, choose **Install package from Git URL** and enter:

```text
https://github.com/pine-ui/package.git#v0.1.0
```

The tag pins the package to version **0.1.0**. For a local checkout, choose **Install package from disk** and select its `package.json`.

The manifest declares Unity `6000.7.0b2`, uGUI `2.7.0` and Input System `6.7.0`.

## Historical prerequisites

| Package | Declared Unity Editor | Declared uGUI | Declared Input System |
| --- | --- | --- | --- |
| Pine 0.1.0 | 6000.7.0b2 | 2.7.0 | 6.7.0 |

These values come from this historical documentation snapshot. Check the installed v0.1.0 manifest and dependency resolution in your Editor before changing the project. Pine 0.2.0's recorded compatibility checks apply to its matching API and do not certify this older package.

Pine 0.1.0 requires a configured TMP default font/settings and an enabled Input System backend, as described below. Run Pine on Unity's main thread and explicitly dispose its mount when the UI lifetime ends. Use this snapshot's `Pine.Pine` facade, `MountHandle` and layout properties.

Use **Copy setup prompt** above or the [version-pinned agent guide](../guides/agents.md) for installation, integration, component and migration prompts.

## Configure text and input

Enable the Input System backend in PlayerSettings. Configure TMP Essential Resources/settings and a default font before creating text. Pine reads `TMP_Settings.defaultFontAsset` when creation defaults are enabled.

Mounting creates native UI objects in code. Pine reuses an existing EventSystem or creates one with `InputSystemUIInputModule`.

## Counter sample

Import **Counter** through Package Manager. Add `PineCounter` to a GameObject for component lifecycle startup, or run its static bootstrap with `-pine-example` or `PINE_EXAMPLE=1`. Choose one startup method and dispose the mount when its interface owner ends.

## C# naming

```csharp
using Pine;
using UI = Pine.Pine;
```

The public types include `Scope`, `Property`, `MountHandle`, `Source<T>`, `Derived<T>`, `Value<T>` and `Spring<T>`. Run Pine synchronously on Unity's main thread.

Continue with [the counter](counter.md).
