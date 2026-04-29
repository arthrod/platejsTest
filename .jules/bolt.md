## 2024-05-14 - [Zustand State Destructuring Optimization]

**Learning:** Destructuring entire Zustand stores (like `const { showRuler } = useLayoutStore()`) causes components to re-render whenever _any_ value in the store changes, not just the destructured ones. This can lead to significant performance bottlenecks, especially in heavily used global stores like layout state.
**Action:** Always use individual selectors or `useShallow` from `zustand/react/shallow` when accessing multiple properties from a Zustand store to ensure components only re-render when the specific data they consume changes.
