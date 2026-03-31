## 2024-05-14 - Zustand Selector Optimization
**Learning:** Destructuring the entire state from a Zustand store (e.g., `const { value } = useStore()`) causes the component to re-render whenever *any* state in the store changes, rather than just when `value` changes. This is a significant performance bottleneck in the `useLayoutStore` as it causes unnecessary re-renders of toolbar buttons and plugins when unrelated layout state changes.
**Action:** Always use individual selectors (e.g., `useStore((state) => state.value)`) to subscribe only to the specific state slices the component needs.
