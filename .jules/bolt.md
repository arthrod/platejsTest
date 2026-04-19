## 2024-05-15 - Zustand Re-render Optimization

**Learning:** Destructuring state directly from Zustand stores (e.g., `const { value } = useStore()`) subscribes the component to the _entire_ store, causing unnecessary re-renders whenever _any_ unrelated state in the store changes.
**Action:** Always use individual selectors (e.g., `const value = useStore(state => state.value)`) or `useShallow` to prevent excessive React component re-renders.
