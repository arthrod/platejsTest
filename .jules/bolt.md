## 2025-02-12 - Prevent Zustand Re-renders via Selectors
**Learning:** Found multiple instances where the entire Zustand store `useLayoutStore()` was destructured (e.g., `const { showRuler } = useLayoutStore()`), which causes the component to re-render whenever *any* state in the store changes, rather than just the accessed properties.
**Action:** When using Zustand stores, always pass a selector function (e.g., `const showRuler = useLayoutStore((state) => state.showRuler)`) or use `useShallow` to isolate reactivity and prevent unnecessary re-renders.
