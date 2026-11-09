# Testing strategy

## Unit and component tests
- Verify button variants, sizes, disabled and loading states.
- Verify card content projection and interactive styling.
- Verify all status pill semantic variants.
- Verify page header title, description, eyebrow and action projection.
- Verify empty-state default and overridden text.

## Accessibility checks
- Ensure buttons have meaningful accessible names from projected content.
- Confirm keyboard focus visibility and disabled state behavior.
- Check color contrast for every semantic status.
- Test responsive header layout and text scaling.

## Consumer validation
- Build the library with `ng build banking-ui`.
- Import components into at least two remotes and verify consistent rendering.
- Verify package version compatibility with the Angular version used by each remote.
