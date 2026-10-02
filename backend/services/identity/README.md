Identity & Consent Service (PSVC-01)
====================================

Scope
- CAP-4 Payments & Accounts
- Implements FR-020 (Account registration/sign-in – foundation only, mocked)
- Jira: Epic TRGO-4; Task TRGO-14
- Confluence: TRGO 6.4 CAP-4 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252

API
- `POST /v1/identity/login` – returns a short-lived mock JWT token

Development
- Install deps at repo root: `npm install`
- Dev: `npm run dev -w @transitgo/identity`
- Test: `npm test -w @transitgo/identity`

