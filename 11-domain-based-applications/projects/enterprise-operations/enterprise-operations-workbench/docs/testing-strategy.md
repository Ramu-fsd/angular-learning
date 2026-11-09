# Testing strategy

## Unit tests

- Validate work-item filtering across text, status, priority, and type.
- Verify KPI calculations for open, critical, resolved, and SLA-risk counts.
- Verify create, update, assignment, and activity-note service operations.
- Test reactive form required and minimum-length validation.

## Component tests

- Dashboard renders expected KPI values and priority items.
- Queue filters narrow results and empty states appear.
- Detail view updates owner, priority, and status.
- Activity notes appear at the top of the timeline.
- Create form navigates to the newly created work item.

## End-to-end scenarios

1. Create a critical incident.
2. Assign it to an analyst.
3. Move it to In Progress.
4. Add an investigation note.
5. Resolve it and confirm dashboard metrics update.

Use synthetic data only. Add API contract and authorization tests when the backend is introduced.
