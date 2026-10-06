---
title: Retained branches and lists
---

# Retained branches and lists

`P.Show`, `P.Switch`, `P.Indexes` and `P.Values` retain branch/row state. Return View declarations and append their results with `.With(() => result.Value)`. Outputs, row indices and presence are read-only. `Branch.Exit` retains a departing branch for its requested lifetime. Keep stable identity keys to retain rows across reordering. [Tracked children](../tutorials/dynamic-ui.md). [Full operator reference](dynamic-reference.md).
