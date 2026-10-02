Real-Time Service (PSVC-04)
===========================

Scope
- CAP-2 Real-Time Tracking
- Implements FR-007 (stop departure board), FR-009 (nearby stops – partially as API)
- Jira: Epic TRGO-2; Story TRGO-18
- Confluence: TRGO 6.2 CAP-2 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/1277953

API
- `GET /v1/departures/:stopId` – returns mocked departures
- `GET /v1/nearby?lat&lng&radius` – nearby stops
- `GET/POST /v1/alerts` – disruptions/alerts (mock)
- Health: `/healthz`, `/readyz`

Development
- Install deps at repo root: `npm install`
- Dev: `npm run dev -w @transitgo/realtime`
- Test: `npm test -w @transitgo/realtime`

