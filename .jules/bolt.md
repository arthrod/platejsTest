
## 2024-05-17 - [Removing @faker-js/faker from client bundle]
**Learning:** Development-only or utility libraries like `@faker-js/faker` can unknowingly leak into production bundles if used in mock responses directly within component files (like `copilot-plugins.tsx`). This adds unnecessary bloat.
**Action:** Replace heavy data-generation libraries in client-side code with lightweight local arrays or simple generator functions when possible to keep bundle sizes minimal.
