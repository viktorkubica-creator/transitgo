TransitGo Terraform Skeleton (Training)
======================================

Scope
- AWS eu-central-1 (Frankfurt), dev/test only (per ADR-002)
- Baseline only – no real infra deployed in training repo

Structure
- `dev/` and `test/` environment folders
- Provider pinned; remote state intentionally omitted (configure per your org)

Notes
- This is a placeholder for TRGO-9. CI does not apply plans.
