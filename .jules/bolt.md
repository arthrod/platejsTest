## 2025-03-06 - [Layout Store Rendering Optimization]

**Learning:** Destructuring state from Zustand stores (e.g., `const { showRuler } = useLayoutStore()`) causes unnecessary re-renders whenever ANY state in the store changes, even if the destructured properties haven't changed.
**Action:** Always use individual selectors when accessing Zustand state (e.g., `const showRuler = useLayoutStore((state) => state.showRuler)`).

## 2025-03-06 - [EmojiPicker Dynamic Import]

**Learning:** `EmojiPicker` is a heavy component that increases the initial bundle size. It can be dynamically imported using `next/dynamic` to optimize load performance. When dynamically importing, we need to provide a loading placeholder matching its dimensions (`h-[23rem] w-80`) to prevent layout shifts.
**Action:** Use `next/dynamic` for heavy UI components like `EmojiPicker` that are not immediately visible.
