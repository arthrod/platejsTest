## 2025-05-18 - Lazy Load Heavy UI Components

**Learning:** Heavy UI components like `EmojiPicker` (which imports a large amount of emoji data and layout) can significantly block the main thread and bloat the initial Javascript bundle size if imported eagerly. In Next.js, this is resolved by deferring the import until interaction time using `next/dynamic`.
**Action:** Always identify interactive-only heavy UI components (like pickers or modals) and lazy-load them with `next/dynamic`. Ensure standard loading indicators match the dimensions of the deferred component to avoid layout shift, and disable SSR if the component handles client-specific data.
