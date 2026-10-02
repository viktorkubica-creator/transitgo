TransitGo – Training Monorepo
================================

Branch `legacy/v1-2025` contains the deprecated 2025 codebase kept for reference.

Stack choice
- Backend: TypeScript (Node.js 20, Express). Reason: fast to run locally and simple mocks.
- Web portal: Next.js app with components and tests (TRGO-13).
- Mobile: Native (SwiftUI / Jetpack Compose) apps with view models and tests (ADR-001).
- Infra: Terraform skeleton for AWS eu-central-1 (dev/test).
- API: OpenAPI 3.1 under `api/openapi.yaml`.

Architecture overview (high level)
- Mobile BFF-style REST services:
  - Journey Planning Service (PSVC-03) – adapter to OpenTripPlanner 2 (mocked) [Implements FR-001..FR-004]
  - Real-Time Service (PSVC-04) – GTFS-RT ingest and departures (mocked) [Implements FR-007..FR-011]
  - Identity & Consent (PSVC-01) – stubbed identity for auth flows [Implements FR-020]
  - Payments Service (PSVC-06) – PSP adapter interface + mock PSP [Implements FR-022..FR-024] (see RISK-004)
  - Notification Service (PSVC-07) – subscription & alert stubs [Implements FR-027..FR-030]
- Shared: common TypeScript utils and Jest unit tests.

Traceability links
- Jira project TRGO board: https://epsylum.atlassian.net/jira/software/projects/TRGO/boards/2
- Confluence spaces:
  - TRGO “TransitGo – Training” Home: https://epsylum.atlassian.net/wiki/spaces/TRGO/overview
  - TRPLAT “TransitGo Platform – Shared Architecture (Training)” Home: https://epsylum.atlassian.net/wiki/spaces/TRPLAT/overview
  - TRWEB “TransitGo Web Portal – Training” Home: https://epsylum.atlassian.net/wiki/spaces/TRWEB/overview
- Service-level READMEs list CAPs, FR/NFRs, Jira keys, and design pages. See also `TRACEABILITY.md`.

Repository layout (will be added across PRs)
- api/ – OpenAPI contracts for BFF endpoints
- backend/services/
  - journey-planning/ (PSVC-03) – FR-001..FR-004 (TRGO-20)
  - realtime/ (PSVC-04) – FR-007, FR-009 (TRGO-18)
  - identity/ (PSVC-01) – FR-020 (TRGO-14)
  - payments/ (PSVC-06) – FR-022..FR-024 (TRGO-16)
  - ticketing/ (PSVC-05) – FR-012..FR-015 (wallet, QR)
  - notifications/ (PSVC-07) – FR-027..FR-030 (future)
- backend/packages/common – shared logger, errors, validation, auth middleware
- mobile/ios – SwiftUI skeleton (TRGO-11)
- mobile/android – Jetpack Compose skeleton (TRGO-12)
- web/ – Next.js stub + design tokens (TRGO-13)
- infra/terraform – AWS eu-central-1 dev/test baseline (TRGO-9)

Local development
- Node.js 20.x is recommended
- Install: `npm install`
- Build all (when packages are present): `npm -ws run build --if-present`
- Test all: `npm -ws test --if-present`

Notes
- External integrations are mocked. No secrets are required.
- Payments PoC intentionally avoids naming a real PSP per RISK-004.
- TRGO-10 (CI/CD) is tracked as a brief documentation note only; no CI workflows are included in this training repo.
 - Build outputs (e.g., Next.js `.next/`) are ignored via `.gitignore`.

Licensing
- MIT (training/demo)
