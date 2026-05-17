## 2025-02-23 - [Preventing app-wide re-renders with Zustand in Next.js/Plate]

**Learning:** Directly destructuring values from a Zustand store (`const { value } = useStore()`) causes the component to re-render whenever _any_ state in the store changes, which is a significant performance anti-pattern.
**Action:** Always use individual selectors (`useStore(state => state.value)`) or `useShallow` from `zustand/react/shallow` (`useStore(useShallow(state => ({ value: state.value })))`) when accessing Zustand store values to prevent unnecessary re-renders.
