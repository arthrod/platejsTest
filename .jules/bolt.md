## 2025-04-10 - Lazy Load Heavy Components

**Learning:** Heavy components like the `EmojiPicker` (which internally loads `@emoji-mart/data`) can significantly bloat the initial client bundle and delay hydration. Lazy-loading such components using Next.js `dynamic` when they are conditionally rendered (e.g. inside a dropdown) reduces initial load time.
**Action:** When lazy-loading heavy UI popups or dropdown contents, use `next/dynamic` with `ssr: false` to avoid hydration issues. Ensure you provide a `loading` fallback that accurately mimics the component's final dimensions (e.g., `h-[23rem] w-80` for EmojiPicker) to prevent Cumulative Layout Shift (CLS) when the component mounts.
