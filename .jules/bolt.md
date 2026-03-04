## 2024-05-24 - [Avoid Destructuring Zustand Store Selectors]
**Learning:** Destructuring the result of a single `useStore()` call (e.g., `const { a, b } = useStore()`) implicitly subscribes the component to *all* changes in the store. This causes unnecessary re-renders whenever unrelated state changes.
**Action:** Always use individual selectors, e.g., `const a = useStore(state => state.a)` to subscribe specifically to only what the component needs, explicitly preventing wasteful re-renders on unrelated changes.
