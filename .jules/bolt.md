
## 2024-03-21 - [Zustand Store Selectors Optimization]
**Learning:** Destructuring `useLayoutStore()` without a selector in Zustand creates a subscription to the entire store. This causes components to re-render whenever *any* state changes, even if the component doesn't depend on the changed state. This was specifically observed in `layout-plugin.tsx`, `index-sidebar-toolbar-button.tsx`, and `layout-toolbar-buttons.tsx` where components would unnecessarily re-render on any layout store change.
**Action:** Always use individual selectors (e.g., `useStore((state) => state.value)`) instead of destructuring the hook call when using Zustand stores to prevent unnecessary component-tree re-renders.
