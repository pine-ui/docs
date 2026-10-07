---
title: Pine generated startup support API
sidebar_label: Generated startup support
description: Reference Pine generated startup support for Unity applications. Check public declarations used to initialize and own the native UI root.
---

# Generated startup support

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `AppStartup`

```text
AppStartup
```

Compiler-generated application startup support.

## `AppStartup.Register`

```text
public static void Register(string assembly, Action start)
```

Registers one compiler-generated application entry before scene loading.
