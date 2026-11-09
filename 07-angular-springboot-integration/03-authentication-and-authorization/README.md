# Authentication and authorization concepts

A common enterprise flow is:

```text
Browser -> Identity Provider -> Authorization Code + PKCE
         -> Angular obtains access token
         -> HTTP interceptor attaches bearer token
         -> Spring Security validates token
         -> Backend checks roles/permissions
```

Key principles:
- Prefer an established OIDC identity provider rather than implementing password authentication yourself.
- Use Authorization Code with PKCE for browser-based public clients.
- Keep access tokens short-lived and follow the identity provider's secure storage guidance.
- Never place passwords, client secrets, or long-lived refresh tokens in local storage.
- Angular route guards improve navigation UX; they are not a security boundary.
- Spring Security must enforce authorization on every protected API.
- Validate issuer, audience, signature, expiry, and scopes/roles on the backend.

This module is a design guide. The runnable sample does not pretend to provide production authentication.
