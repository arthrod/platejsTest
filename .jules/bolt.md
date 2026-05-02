## 2024-05-02 - Optimize Zustand Store Subscriptions with `useShallow`

**Learning:** Destructuring directly from a Zustand store (e.g. `const { a, b } = useStore()`) subscribes the component to the _entire_ store state. This causes unnecessary re-renders whenever _any_ unrelated value in the store changes, which is a significant performance anti-pattern.
**Action:** Always use individual selectors (e.g., `useStore(state => state.a)`) or `useShallow` from `zustand/react/shallow` when accessing multiple properties to ensure the component only re-renders when the specific properties it depends on change.
