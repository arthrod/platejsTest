## 2024-05-14 - Lazy Loading EmojiPicker in Plate.js

**Learning:** `EmojiPicker` is a heavy component that increases initial bundle size significantly. When dynamically importing it to improve performance (using `next/dynamic`), it is critical to provide a placeholder with specific dimensions (`h-[23rem] w-80`) matching the actual component. This prevents layout shifts and improves perceived performance when the dropdown is opened. The `@emoji-mart/data` dataset and `EmojiPicker` content are deferred until the dropdown is accessed.

**Action:** Always use a placeholder with accurate dimensions when lazy-loading UI components within dropdowns or toolbars in the Plate.js ecosystem to ensure a smooth user experience.
