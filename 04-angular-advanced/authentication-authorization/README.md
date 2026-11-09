# Authentication and Authorization

## Business scenario
A bank employee signs in to an operations portal and may be allowed to view, approve, or reverse payments depending on assigned roles and scopes.

## Authentication vs authorization
- Authentication establishes who the user is.
- Authorization determines what that identity may do on a specific resource.
- A role in a token is not a substitute for backend policy evaluation.
- APIs should enforce least privilege, resource ownership, transaction limits, and separation of duties.

## Browser architecture guidance
- Prefer a Backend-for-Frontend (BFF) with Secure, HttpOnly, SameSite cookies when suitable.
- For browser-based OAuth/OIDC clients, use Authorization Code with PKCE through a vetted OIDC library.
- Avoid implicit flow and do not embed client secrets in browser code.
- Avoid storing long-lived bearer tokens in `localStorage`.
- Protect cookie-authenticated state-changing requests against CSRF using an architecture-appropriate defense.
- Validate issuer, audience, signature, expiry, and scopes on the server/API gateway.

## Example
`authorization-policy.ts` demonstrates a UI capability check. It is only a presentation helper; backend enforcement remains mandatory.

## Practice
1. Define permissions for payment view, approve, and reverse.
2. Model maker-checker separation of duties.
3. Explain token expiry and refresh strategies.
4. Draw a browser-to-BFF-to-microservices authentication flow.
