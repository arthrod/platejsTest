## 2025-02-28 - Lazy loading `next/dynamic`

**Learning:** When using Next.js `next/dynamic` to lazy-load heavy React components like the Emoji picker, it is important to include a loading placeholder (e.g. `loading: () => <div className="h-[23rem] w-80" />`) to prevent layout shifts. Playwright testing might also take a moment for the component to initialize, so adequate timeouts must be set when waiting for dynamic components.

**Action:** Whenever a heavy UI component that is initially hidden (like a dropdown or popover content) is discovered, consider dynamically loading it. Provide an explicitly sized placeholder and be mindful of load delays in E2E tests.
