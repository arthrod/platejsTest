## 2024-06-25 - Avoid Destructuring Zustand Store

**Learning:** Destructuring state from Zustand's `useStore()` hook without selectors causes the component to subscribe to all state changes within the store, triggering unnecessary re-renders even when the accessed values haven't changed.
**Action:** Always use individual selectors for each property when accessing state from a Zustand store (e.g., `const value = useStore(state => state.value)`).
