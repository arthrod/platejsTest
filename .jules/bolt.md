## 2024-05-01 - Prevent unnecessary re-renders with Zustand selectors

**Learning:** Destructuring the entire state from a Zustand store (e.g., `const { a, b } = useStore()`) subscribes the component to _all_ state changes in the store. This causes unnecessary re-renders whenever any unreferenced value in the store changes, which degrades performance across the app.
**Action:** Always use individual selectors (e.g., `const a = useStore((state) => state.a)`) or a shallow comparison if selecting multiple fields, to ensure components only re-render when their specific dependencies change.
