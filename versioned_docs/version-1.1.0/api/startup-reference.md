---
title: "Pine generated startup support API (Pine 1.1.0)"
sidebar_label: Generated startup support
description: "Complete typed reference with overloads, parameters, ownership and examples for Pine generated startup support. Pine 1.1.0 documentation."
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
