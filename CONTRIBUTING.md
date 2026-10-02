Contributing – TransitGo (Training)
===================================

Branching
- feature branches: `feature/TRGO-<n>-short-name`
- examples:
  - `feature/TRGO-11-ios-skeleton`
  - `feature/TRGO-20-journey-planning-api`

Commits
- Prefix each commit message with the Jira key, e.g.:
  - `TRGO-20: add /v1/journeys search endpoint`
  - `TRGO-11: create SwiftUI tab skeleton`

Pull requests
- Title: `TRGO-<n>: <summary from Jira>`
- Body:
  - Jira link: `https://epsylum.atlassian.net/browse/TRGO-<n>`
  - Implemented FR IDs (e.g. `FR-001, FR-002, FR-003`)
  - Confluence solution design page URL (e.g. TRGO 6.1, 6.2, 6.4)
  - What changed
  - How to test locally

Code style
- TypeScript: prefer explicit types on public APIs, readable names, unit tests for endpoints and adapters.
- Comments: reference requirement IDs where natural, e.g. `// Implements FR-012 (TRGO-18)`.

CI
- GitHub Actions builds and tests Node workspaces via `npm -ws run build --if-present` and `npm -ws test --if-present`.

Scope
- This repository is a compact training/demo codebase. Integrations are mocked and carry no real secrets.
