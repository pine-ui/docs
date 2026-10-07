---
title: "Retained UI branches and lists (Pine 1.1.0)"
sidebar_label: Retained branches and lists
description: "Retain Unity UI branch and row state with P.Show, P.Switch, P.Indexes and P.Values. Learn stable identity, tracked children and branch exit lifetimes. Pine 1.1.0 documentation."
---

# Retained branches and lists

`P.Show`, `P.Switch`, `P.Indexes` and `P.Values` retain branch/row state. Return View declarations and pass their results as `children: () => result.Value`. Outputs, row indices and presence are read-only. `Branch.Exit` retains a departing branch for its requested lifetime. Keep stable identity keys to retain rows across reordering. [Tracked children](../tutorials/dynamic-ui.md). [Full operator reference](dynamic-reference.md).
