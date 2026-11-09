# Proposed backend API contract

The UI currently uses synthetic in-memory data. Suggested future endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/fraud/cases` | Search and paginate investigation cases |
| GET | `/api/fraud/cases/{caseId}` | Retrieve case details |
| PATCH | `/api/fraud/cases/{caseId}/status` | Change case status |
| GET | `/api/fraud/alerts` | Query alert feed |
| POST | `/api/fraud/alerts/{alertId}/cases` | Create an investigation from an alert |
| GET | `/api/fraud/rules` | List detection rules |
| PATCH | `/api/fraud/rules/{ruleId}` | Update rule state or configuration |

The backend must validate transitions, enforce analyst permissions, and record decisions in an audit trail. Detection and blocking decisions must not be trusted to the browser.
