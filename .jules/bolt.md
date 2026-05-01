## 2024-05-20 - [Zustand `useShallow` performance optimization]

**Learning:** When selecting multiple properties from a Zustand store by returning an object directly, components can re-render unnecessarily on any state change, even when the specific properties haven't changed.
**Action:** Use `useShallow` from `zustand/react/shallow` when selecting an object of multiple properties from a Zustand store to ensure the component only re-renders when the selected properties actually change.
