Journey Planning Service (PSVC-03)
=================================

Scope
- CAP-1 Journey Planning
- Implements FR-001, FR-002, FR-003, FR-004
- Jira: Epic TRGO-1; Story TRGO-20; Related Task TRGO-19
- Confluence: TRGO 6.1 CAP-1 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1245185

API
- `GET /v1/journeys?origin=...&destination=...&time=...&arriveBy=...`
  - Returns mocked journey options (OpenTripPlanner adapter is mocked)

Development
- Install deps at repo root: `npm install`
- Dev: `npm run dev -w @transitgo/journey-planning`
- Test: `npm test -w @transitgo/journey-planning`

Notes
- Code comments reference FR IDs and Jira keys.
