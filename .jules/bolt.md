## 2024-06-25 - Prevent Unnecessary Re-renders from Zustand Store Destructuring

**Learning:** Destructuring the entire state from a Zustand store (e.g., `const { a, b } = useStore()`) inside a Next.js component causes the component to re-render whenever ANY property in the store changes, not just the destructured ones. This can lead to significant performance bottlenecks, especially in complex components or layouts.
**Action:** Always use individual selectors (e.g., `const a = useStore(state => state.a)`) or `useShallow` from `zustand/react/shallow` when accessing multiple properties (e.g., `const { a, b } = useStore(useShallow(state => ({ a: state.a, b: state.b })))`) to ensure components only re-render when the specific properties they depend on change.
