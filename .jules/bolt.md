## 2024-05-18 - [Zustand Store Re-renders]

**Learning:** Found multiple components destructuring the entire Zustand store (`const { a, b } = useStore()`). This is an anti-pattern that causes the component to re-render whenever _any_ state in the store changes, rather than just the properties being used.
**Action:** When accessing multiple properties from a Zustand store, always use `useShallow` from `zustand/react/shallow` to only re-render when the specific properties being accessed change. For single properties, use a selector `useStore((state) => state.a)`.
