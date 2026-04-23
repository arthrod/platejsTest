## 2024-05-24 - Zustand Destructuring Re-renders

**Learning:** Destructuring directly from `useStore()` in Zustand without a selector causes the component to subscribe to the _entire_ store. Any update to any field in the store will trigger a re-render of the component, even if the destructured fields haven't changed.
**Action:** Always use individual selectors (e.g., `useStore(state => state.field)`) or `useShallow` from `zustand/react/shallow` when extracting multiple fields (e.g., `useStore(useShallow(state => ({ a: state.a, b: state.b })))`) to optimize performance and prevent unnecessary React renders.
