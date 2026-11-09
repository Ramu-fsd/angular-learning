# API contract proposal

All endpoints are illustrative and are not implemented by this front-end demo.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/work-items` | Search and page work items |
| POST | `/api/v1/work-items` | Create incident or service request |
| GET | `/api/v1/work-items/{id}` | Retrieve work-item detail |
| PATCH | `/api/v1/work-items/{id}` | Update status, priority, or assignment |
| POST | `/api/v1/work-items/{id}/activity` | Add an audit/activity entry |
| GET | `/api/v1/operations/summary` | Retrieve operational KPI summary |

## Example create request

```json
{
  "title": "Payment reconciliation batch delayed",
  "type": "Incident",
  "priority": "Critical",
  "requester": "Finance Operations",
  "department": "Finance",
  "description": "The morning reconciliation batch has not completed."
}
```

Production APIs should validate transitions, authorize every mutation, return stable error codes, and use pagination for queue results.
