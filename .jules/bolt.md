## 2024-02-09 - Zustand store destructuring causes unnecessary re-renders
**Learning:** Destructuring entire Zustand stores (like `const { showRuler } = useLayoutStore()`) instead of using individual selectors (`const showRuler = useLayoutStore(state => state.showRuler)`) causes the component to re-render whenever *any* property in the store changes, rather than just the accessed properties. This is a common React performance anti-pattern.
**Action:** Always use individual selectors when consuming state from Zustand stores in Next.js/React to prevent unnecessary re-renders.
