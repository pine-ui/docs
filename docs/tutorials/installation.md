---
title: Installation
---

# Installation

In **Window → Package Manager → Install package from Git URL**, enter:

```text
https://github.com/pine-ui/package.git#v1.0.0
```

Alternatively download the [1.0.0 UPM archive](/packages/com.kbenim.pine-1.0.0.tgz) and [SHA-256 checksum](/packages/com.kbenim.pine-1.0.0.tgz.sha256), then use **Install package from tarball**. Local contributors can select `package.json` with **Install package from disk**.

The 1.0.0 tag and archive were replaced with this API on 2026-10-06. Earlier 1.0.0 installs use the previous API. Remove/reinstall the package to refresh the Git revision, or install this matching archive. Replace old `UI`, `Label`, `Column` and `Row` calls with `P`, `Text`, `Vertical` and `Horizontal`; factories now return `View`, with `.With(...)` for composition. No compatibility aliases are supplied.

The declared baseline remains Unity 6000.3, uGUI 2.0.0 and Input System 1.20.1. Unity resolves its compatible uGUI core package. Native additions have version gates: RaycastReceiver (2.5), SafeArea and LayoutElement max dimensions (2.6), TMP advanced text (2.7), Canvas reflection probes (Unity 6000.4).

Create one `App.cs` with a public static `View Mount()` method, or import the Counter sample. Pine generates startup and supplies a canvas and compatible EventSystem. An explicit `P.Canvas` root reuses that canvas. TMP defaults are installed only when missing; existing resources and external input ownership are preserved.

[Build the counter](counter.md). [Compatibility evidence](https://github.com/pine-ui/package/blob/main/COMPATIBILITY.md).
