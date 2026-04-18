## 2024-04-18 - [Lazy Load Emoji Picker Component]

**Learning:** The `@emoji-mart/data` dataset and the UI elements are heavy. When dynamically loading the UI elements that are heavy, like the emoji picker, use `next/dynamic` and provide a proper loading fallback (`h-[23rem] w-80`) with `ssr: false`.
**Action:** Use `next/dynamic` for heavy UI components (e.g. `EmojiPicker`) to optimize initial bundle size, and make sure `ssr: false` is set to avoid hydration mismatches.
