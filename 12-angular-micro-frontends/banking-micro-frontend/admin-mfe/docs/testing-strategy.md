# Testing strategy

## Unit tests
- Pending request count and request decision state transitions.
- User search across name, email, and role.
- User activation/suspension state changes.
- Audit filtering by actor, action, and target.
- Feature toggle state transitions.

## Component tests
- Verify navigation between overview, users, requests, audit, and settings.
- Verify pending requests expose approve/reject actions only.
- Verify status labels update after local decisions.
- Verify search fields filter displayed rows.

## Integration and end-to-end
- Start the remote on port 4204 and verify standalone rendering.
- Load the remote through the Banking Shell.
- Verify host-to-remote navigation and browser refresh behavior.
- Verify API authorization and audit behavior once backend integration exists.

All current data and actions are local demo behavior.
