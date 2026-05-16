## 2024-05-17 - [EmojiPicker SSR Hydration]

**Learning:** Using `next/dynamic` with `ssr: false` for the `EmojiPicker` component in `@udecode/plate-emoji` leads to the internal emoji grid rendering empty on the first load, even though the outer picker shell renders. This represents a functional regression where standard Next.js optimizations break third-party component hydration.
**Action:** Revert the `next/dynamic` lazy loading and seek other caching/optimization strategies for `EmojiMartData` or accept the bundle weight.
