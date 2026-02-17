## 2026-02-17 - [Plate UI Lazy Loading]
**Learning:** Heavy components like `EmojiPicker` are statically imported in toolbar components, bloating the initial bundle. Next.js `dynamic` imports work seamlessly with Plate's UI components, even for named exports.
**Action:** Always check toolbar dropdowns for heavy static imports and apply lazy loading to defer their cost until interaction.
