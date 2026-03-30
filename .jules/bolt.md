## 2024-03-30 - Lazy Loading Heavy Emoji Picker with Matching Placeholders

**Learning:** Heavy UI components like `EmojiPicker` (which includes `@emoji-mart/data` and many subcomponents) can significantly bloat the initial bundle size when imported eagerly. While lazy loading with `next/dynamic` is a standard optimization, failing to provide a dimension-matched loading placeholder will result in jarring layout shifts when the dropdown opens and triggers the load.
**Action:** When lazy loading dropdown contents or modals, always measure the rendered dimensions of the component (e.g., `h-[23rem] w-80` for the EmojiPicker) and provide a matching skeleton or empty div as the `loading` fallback in `next/dynamic` to maintain UI stability during Fast Refresh or initial load.
