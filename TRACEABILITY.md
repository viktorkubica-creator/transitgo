Requirements Traceability – TransitGo (Training)
================================================

This repository uses real requirement IDs (FR/NFR), Jira keys (TRGO-…), and Confluence page URLs from the training dataset. The table below maps feature requirements to Jira and to code locations in this monorepo, with links to the corresponding solution-design pages.

Legend
- CAP-1 Journey Planning – TRGO 6.1 https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1245185
- CAP-2 Real-Time Tracking – TRGO 6.2 https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1277953
- CAP-3 Digital Tickets & Validation – TRGO 6.3 https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/786450
- CAP-4 Payments & Accounts – TRGO 6.4 https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252
- CAP-5 Notifications & Alerts – TRGO 6.5 https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1310721

Traceability
- FR-001, FR-002, FR-003 (CAP-1)
  - Jira: TRGO-20 “Journey search API (origin/destination, depart-at/arrive-by)”
  - Code: `backend/services/journey-planning/src/routes/journeys.ts`
  - Confluence: TRGO 6.1 CAP-1 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1245185
- FR-004 (CAP-1)
  - Jira: TRGO-20; related task TRGO-19
  - Code: `backend/services/journey-planning/src/services/itinerary-builder.ts`
  - Confluence: TRGO 6.1 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1245185
- FR-007, FR-009 (CAP-2)
  - Jira: TRGO-18 “Departures and nearby stops API”
  - Code: `backend/services/realtime/src/routes/departures.ts`
  - Confluence: TRGO 6.2 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1277953
- FR-020 (CAP-4)
  - Jira: TRGO-14 “Amazon Cognito user pool and OIDC identity foundation”
  - Code: `backend/services/identity/src/routes/auth.ts`
  - Confluence: TRGO 6.4 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252
- FR-022, FR-023, FR-024 (CAP-4)
  - Jira: TRGO-16 “Spike: payment gateway PoC (3DS2, Apple Pay, Google Pay)”
  - Code: `backend/services/payments/src/psp/PspAdapter.ts`, `backend/services/payments/src/psp/mocks/MockPsp.ts`, `backend/services/payments/src/routes/payments.ts`
  - Confluence: TRGO 6.4 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252
- FR-034 (cross-cutting i18n)
  - Jira: TRGO-11 “iOS app skeleton…”, TRGO-12 “Android app skeleton…”
  - Code: `mobile/ios/TransitGoApp/`, `mobile/android/app/src/main/java/.../MainActivity.kt`
  - Confluence: TRGO 5.1 Design System – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/688146

Notes
- Endpoint contracts are defined in `api/openapi.yaml`.
- Code comments reference FR IDs and Jira keys near the implementing endpoints for quick searchability (e.g. `// Implements FR-001 (TRGO-20)`).
