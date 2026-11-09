# Testing checklist
- Queue search and status/risk filters compose correctly.
- Document review updates only the selected evidence item.
- Due-diligence checklist state is reflected in the UI.
- Notes attach to the correct application.
- Decision workflow handles invalid transitions and API failures.
- Sensitive identifiers remain masked.
E2E scenario: open a submitted application, inspect evidence, mark one document for re-upload, add a note, and verify the updated status in the queue.
