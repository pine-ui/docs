---
title: State and ownership
---

# State and ownership

Import `using Pine;`. `P.Source<T>` creates writable state; `P.Derive` caches tracked calculations; `P.Effect` observes changes. `P.Batch` groups writes and `P.Untrack` reads without subscriptions. Sources can exist independently; calculations, effects and cleanup require an owned scope.

`P.Root` creates an explicit scope. `P.Mount` owns a native tree. `Scope.Run` enters a live scope; disposal attempts all cleanup in reverse order. `P.Cleanup` owns callbacks, disposables and native Unity objects. Context providers remain visible to deferred views and their event callbacks. See [state](state-reference.md), [scope](scope-reference.md) and [signal](signal-reference.md) references.
