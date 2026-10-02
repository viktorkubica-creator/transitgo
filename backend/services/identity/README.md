Identity & Consent Service (PSVC-01)
====================================

Scope
- CAP-4 Payments & Accounts
- Implements FR-020 (Account registration/sign-in – foundation only, mocked)
- Jira: Epic TRGO-4; Task TRGO-14
- Confluence: TRGO 6.4 CAP-4 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252

API
- `POST /v1/identity/login` – returns a short-lived mock JWT token
- `GET /v1/identity/.well-known/jwks.json` – mock JWKS
- `GET /v1/identity/profile` – current profile
- `PUT /v1/identity/consents` – save consents
- `POST /v1/identity/token/refresh` – refresh token
- `DELETE /v1/identity/account` – account deletion (GDPR)
- Health: `/healthz`, `/readyz`

Development
- Install deps at repo root: `npm install`
- Dev: `npm run dev -w @transitgo/identity`
- Test: `npm test -w @transitgo/identity`

