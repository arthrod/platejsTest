## 2025-02-14 - Lazy loading Heavy UI Components

**Learning:** Heavy UI components like `EmojiPicker` in this Next.js app cause large initial bundle sizes and layout shifts if not lazily loaded correctly.
**Action:** Always use `next/dynamic` with `ssr: false` and a matching size placeholder (`h-[23rem] w-80` for EmojiPicker) for heavy client-side components to optimize bundle size and prevent hydration mismatch and layout shifts.
