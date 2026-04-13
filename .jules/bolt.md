## 2024-05-24 - [Zustand Store Optimization]

**Learning:** Destructuring entire state objects from Zustand stores (like `const { showRuler } = useLayoutStore()`) causes unnecessary re-renders across the component tree whenever ANY property in that store changes, bypassing Zustand's built-in performance optimization.
**Action:** Always use individual selectors for Zustand stores: `const showRuler = useLayoutStore(state => state.showRuler);`.
