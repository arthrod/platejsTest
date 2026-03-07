## 2024-03-08 - Client-Side Faker Dependency Bloat

**Learning:** Found `@faker-js/faker` imported into a client component (`src/components/editor/plugins/copilot-plugins.tsx`) to generate mock responses. This drastically increased the client bundle size for a minor feature (mock fallback). Heavy mock data generators should be avoided in client bundles.
**Action:** Replace `faker.lorem.sentence()` with a lightweight array of hardcoded fallback strings to completely remove the dependency from the client-side bundle.
