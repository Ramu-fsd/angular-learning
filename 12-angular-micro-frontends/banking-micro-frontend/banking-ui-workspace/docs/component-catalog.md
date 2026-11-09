# Component catalog

## `bank-button`
Inputs: `variant` (`primary | secondary | danger | ghost`), `size` (`small | medium | large`), `disabled`, `loading`, `type`. Content projection supplies the label.

## `bank-card`
Input: `interactive`. Content projection supplies the card body.

## `bank-status-pill`
Input: `status` (`success | warning | danger | info | neutral`). Project the status text.

## `bank-page-header`
Inputs: `title`, `description`, `eyebrow`. Content projection supplies optional action controls.

## `bank-empty-state`
Inputs: `title`, `description`, `icon`. Content projection supplies an optional action.

All components are standalone. Import the component class into the consuming standalone component's `imports` array.
