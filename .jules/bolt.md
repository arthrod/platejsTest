## 2024-05-18 - Lazy Loading Heavy UI Components in Radix Dropdowns

**Learning:** Heavy UI components like `EmojiPicker` (which internally loads large datasets like `@emoji-mart/data`) inside Radix UI dropdowns should be lazy-loaded using `next/dynamic` to optimize initial bundle size. When doing this, a placeholder with exact dimensions (e.g., `loading: () => <div className="h-[23rem] w-80" />`) is needed to prevent layout shifts. Setting `ssr: false` is also important to prevent hydration mismatches.
**Action:** Always use `next/dynamic` with `ssr: false` and a sized loading placeholder for heavy components triggered by popovers or dropdowns.
