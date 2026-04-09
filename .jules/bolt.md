## 2024-05-18 - [Optimize Zustand Store Selectors]

**Learning:** Destructuring entire state objects from a Zustand store (e.g., `const { a, b } = useStore()`) causes components to re-render whenever _any_ state in the store changes, even if `a` or `b` themselves haven't changed. In a complex editor application, this leads to widespread, unnecessary re-renders in the component tree.
**Action:** Always use individual selectors when accessing Zustand state (e.g., `const a = useStore((state) => state.a)`). This ensures components only subscribe to the specific pieces of state they actually need, significantly improving performance and reducing unnecessary React renders.
