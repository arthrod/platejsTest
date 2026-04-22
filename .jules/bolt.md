## 2024-02-18 - [Prevent unnecessary re-renders with Zustand `useShallow`]

**Learning:** Destructuring a zustand store object in this Next.js app without `useShallow` creates unnecessary component-tree re-renders, impacting performance. `const { a, b } = useStore()` causes the component to re-render whenever _any_ state in the store changes, not just `a` or `b`.
**Action:** Always use individual selectors (e.g., `state => state.value`) or `useShallow` from `zustand/react/shallow` when accessing multiple properties from a Zustand store to prevent unnecessary re-renders.
