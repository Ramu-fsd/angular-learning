# Domain model

## Fraud alert
- `id`: stable alert identifier
- `transactionId`: transaction reference
- `customerRef`: masked/non-identifying customer reference
- `amount`, `currency`: transaction amount
- `riskScore`: illustrative score from 0–100
- `severity`: LOW, MEDIUM, HIGH, CRITICAL
- `status`: OPEN, INVESTIGATING, ESCALATED, CLOSED
- `reason`: rule/model explanation supplied by the risk platform
- `createdAt`: alert creation timestamp
- `assignedTo`: analyst identifier, if assigned

## Investigation note
- `id`, `alertId`, `author`, `createdAt`, `body`

Production notes: avoid exposing full PAN, credentials, government identifiers, or unnecessary customer data to the browser. Treat risk explanations as controlled data and record analyst actions server-side.
