## 2024-03-09 - Large mock data libraries in client bundles
**Learning:** Heavy dependencies like `@faker-js/faker` should not be used in client-side components for simple tasks like generating a single mock sentence, as it dramatically inflates the client bundle size without providing proportional value.
**Action:** Always prefer a small, lightweight local replacement (like an array of hardcoded strings) for simple mock data generation in client bundles to optimize the application's load time and execution performance.
