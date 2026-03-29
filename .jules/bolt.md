## 2024-05-24 - [Zustand Store Re-renders]

**Learning:** Destructuring the whole state from a Zustand store (e.g., `const { a, b } = useStore()`) causes the component to re-render whenever _any_ state in the store changes, rather than just the properties being used.
**Action:** Always use individual, fine-grained selectors (e.g., `const a = useStore(state => state.a)`) when using Zustand stores to prevent unnecessary component-tree re-renders, especially on highly interactive UI components like toolbars and complex layouts.
