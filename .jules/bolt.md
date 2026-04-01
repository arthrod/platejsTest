## 2024-04-01 - Zustand Destructuring Causes Over-rendering

**Learning:** Found an anti-pattern in the codebase where `useLayoutStore` from Zustand was being destructured (e.g. `const { value } = useStore()`). This causes the component to subscribe to the entire state object, leading to unnecessary re-renders whenever _any_ unrelated state changes in the store.
**Action:** Always use individual selectors for Zustand stores (e.g. `const value = useStore(state => state.value)`) instead of destructuring the whole state hook.
