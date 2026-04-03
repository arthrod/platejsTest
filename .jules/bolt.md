## 2024-03-24 - [Bundle Size Reduction]

**Learning:** Heavy dependencies like `@faker-js/faker` used in client-side components (like `copilot-plugins.tsx`) and large UI components like `EmojiPicker` can bloat the Next.js First Load JS bundle size significantly. Eager loading of these components causes them to be included in the initial bundle even if they are only used rarely or within hidden dropdown menus.
**Action:** Replace heavy mock data libraries with lightweight local strings when possible, and use `next/dynamic` to lazy-load large UI components (especially those inside dropdowns or modals) to decrease the initial page load size.
