## 2024-05-19 - Emoji Picker Lazy Loading

**Learning:** Heavy UI components like `EmojiPicker` can significantly impact initial bundle size. Using `next/dynamic` to lazy load them until they are needed (e.g., when the dropdown is opened) improves performance without sacrificing user experience.
**Action:** Use `next/dynamic` for heavy, infrequently used components.
