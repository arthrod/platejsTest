
## 2024-03-08 - Use Zustand Selectors to Prevent Whole-App Re-renders
**Learning:** Destructuring state directly from `useLayoutStore()` (e.g., `const { layoutMode } = useLayoutStore()`) subscribes the component to *all* changes in the store. Since the layout store manages states like `showIndexSidebar`, `showRuler`, and `layoutMode`, toggling any of these caused the entire `LayoutProvider` and related UI toolbars to unnecessarily re-render.
**Action:** Always use individual Zustand selectors (e.g., `const layoutMode = useLayoutStore(state => state.layoutMode)`) for each property needed. This ensures the component only re-renders when the specific piece of state it depends on changes.
