# Testing strategy

## Unit tests
- Risk and status CSS class mapping.
- Case search and combined risk/status filters.
- Open case count when a case is closed or reopened.
- Case status transition updates and selected detail state.
- Detection rule enable/disable behavior.

## Component tests
- Render overview KPIs, priority cases and alert feed.
- Select a case and verify detail content.
- Filter investigations and verify results.
- Verify alert-to-case action feedback.
- Verify rule toggle state and accessible pressed state.

## Integration and end-to-end
- Start remote on port `4205` and verify standalone rendering.
- Load remote from Banking Shell and verify navigation.
- Verify refresh/deep-link behavior after routes are added.
- Verify backend authorization, audit logging and error handling when APIs are integrated.

Current interactions are local demo behavior only.
