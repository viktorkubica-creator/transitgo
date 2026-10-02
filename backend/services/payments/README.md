Payments Service (PSVC-06)
==========================

Scope
- CAP-4 Payments & Accounts
- Implements FR-022 (card payment intent), FR-023 (wallet-ready), FR-024 (tokenisation-ready)
- Jira: Epic TRGO-4; Task (spike) TRGO-16
- Confluence: TRGO 6.4 CAP-4 – https://epsylum.atlassian.net/wiki/spaces/TRGO/pages/819252
- Risk: RISK-004 – Payment gateway onboarding/certification delay (no real PSP named)

API
- `POST /v1/payments/intents` – creates a mock payment intent `{ id, clientSecret, amount, currency, status }`
- `POST /v1/payments/3ds/simulate` – mark intent succeeded (training)
- `POST /v1/payments/webhook` – verify HMAC signature
- `GET /v1/products` – ticket products catalogue
- `POST /v1/orders` / `GET /v1/orders` – order history
- `POST /v1/refunds` / `GET /v1/refunds` – refunds
- Health: `/healthz`, `/readyz`

Development
- Install deps at repo root: `npm install`
- Dev: `npm run dev -w @transitgo/payments`
- Test: `npm test -w @transitgo/payments`

