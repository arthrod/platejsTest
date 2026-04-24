## 2024-04-24 - Prevent unnecessary re-renders via Zustand selectors

**Learning:** Destructuring whole state from a Zustand store (e.g. `const { a, b } = useStore()`) causes the component to re-render whenever _any_ state in the store changes.
**Action:** Always use individual selectors (e.g. `const a = useStore(state => state.a)`) or `useShallow` from `zustand/react/shallow` when extracting multiple values from a store to prevent unnecessary performance overhead and re-renders across the component tree.
