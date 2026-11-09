# Testing strategy

## Shell unit/component tests

- Navigation links route to the correct shell paths.
- Overview renders platform capability cards and host metadata.
- Placeholder routes render the expected remote-not-registered message.
- Responsive navigation remains usable at narrow viewport widths.

## Federation integration tests (after remotes exist)

- Host resolves each configured remote entry.
- Remote loading failure displays a fallback instead of breaking the shell.
- Shared dependencies resolve according to the agreed version policy.
- Browser refresh on a remote route works with server-side SPA fallback.
- CORS and CSP allow only the expected deployment origins.

## End-to-end scenarios

1. Open the shell.
2. Navigate to Accounts and verify the remote loads.
3. Navigate to Payments and verify the remote loads.
4. Simulate a remote outage and verify the shell remains usable.
5. Verify role restrictions at the backend, not only in navigation.
