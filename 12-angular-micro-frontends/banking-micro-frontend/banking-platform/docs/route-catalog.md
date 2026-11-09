# Route catalog

| Host route | Remote | Business capability |
|---|---|---|
| `/accounts` | `accounts` | Account portfolio, balances and transactions |
| `/payments` | `payments` | Payment operations and approval workflow |
| `/customers` | `customers` | Customer profiles and relationship servicing |
| `/admin` | `admin` | Users, roles, access requests and audit |
| `/fraud-risk` | `fraud-risk` | Alerts, investigations and detection rules |

The route table is a target integration contract. Actual exposed module identifiers must be taken from each remote's generated federation configuration.
