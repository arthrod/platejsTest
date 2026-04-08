## 2024-03-20 - Prevent Unnecessary Re-renders with Zustand Selectors

**Learning:** Destructuring Zustand store objects (e.g., `const { showRuler } = useLayoutStore()`) causes the component to re-render whenever _any_ value in the store changes, not just the destructured ones. This is a common performance bottleneck in React applications using Zustand.
**Action:** Always use individual selector functions when accessing Zustand stores (e.g., `const showRuler = useLayoutStore(state => state.showRuler)`) to subscribe only to the specific state slice needed by the component.
