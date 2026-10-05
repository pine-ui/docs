---
title: Installation
description: Install Pine 0.1.0 and create reactive Unity UI in code.
---

# Installation

Pine **0.1.0** builds retained uGUI in C# with native Unity components and explicit typed reactive state.

## Install the package

In Unity's Package Manager, choose **Install package from Git URL** and enter:

```text
https://github.com/pine-ui/package.git#v0.1.0
```

The tag pins the package to version **0.1.0**. For a local checkout, choose **Install package from disk** and select its `package.json`.

The manifest declares Unity `6000.7.0b2`, uGUI `2.7.0` and Input System `6.7.0`.

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
