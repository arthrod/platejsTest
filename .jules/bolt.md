## 2024-05-22 - [Zustand Destructuring Anti-pattern]

**Learning:** Found a performance bottleneck where components were destructuring state from `useLayoutStore()`, which causes the component to subscribe to the entire store state. This leads to unnecessary re-renders when unrelated store state changes. This is specifically relevant to how Zustand manages subscriptions and re-renders in this codebase.
**Action:** Always use individual selectors when accessing Zustand store state (e.g., `useLayoutStore((state) => state.specificField)`) to limit subscriptions to only the accessed properties and prevent unnecessary component re-renders.
