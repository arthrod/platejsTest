
## 2025-02-17 - [Zustand Store Re-render Optimization]
**Learning:** Destructuring state directly from a Zustand store hook (e.g., `const { a, b } = useStore()`) causes the component to subscribe to the entire store and re-render whenever ANY state in the store changes, rather than just the accessed properties.
**Action:** Always use individual selectors (e.g., `const a = useStore(state => state.a)`) or `useShallow` when consuming Zustand store state to ensure components only re-render when the specific properties they depend on change.
