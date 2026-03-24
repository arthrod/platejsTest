## 2024-05-24 - [Optimize Zustand Selectors]
**Learning:** Using whole-state destructuring with Zustand (e.g. `const { a, b } = useStore()`) causes the component to re-render whenever *any* state in the store changes, rather than only when `a` or `b` change. This can lead to significant unnecessary re-renders in the app or component tree.
**Action:** Always use individual selectors (e.g. `const a = useStore(state => state.a)`) to extract values from Zustand stores to ensure optimal performance and minimize re-renders.
