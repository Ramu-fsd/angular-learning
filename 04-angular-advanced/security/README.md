# Angular Frontend Security

## Banking portal threat model

Protect customer information, payment intent, employee sessions, and operational actions. Treat all browser code, client state, and user input as untrusted.

## Key controls

### Cross-site scripting (XSS)
- Use Angular template binding and sanitization.
- Avoid `ElementRef.nativeElement.innerHTML`, `bypassSecurityTrust...`, and direct DOM injection.
- Never render untrusted HTML unless it has been rigorously sanitized for the exact context.
- Apply a restrictive Content Security Policy (CSP) and Trusted Types where supported.

### Cross-site request forgery (CSRF)
- CSRF is relevant when browsers automatically attach credentials such as cookies.
- Use SameSite cookie settings plus a synchronizer token or another defense appropriate to the architecture.
- Validate Origin/Referer as defense-in-depth where appropriate.
- CORS is not a CSRF defense.

### Content Security Policy
- Prefer nonce- or hash-based strict CSP.
- Avoid broad `unsafe-inline` and `unsafe-eval` allowances.
- CSP reduces the impact of some injection flaws; it does not replace output encoding, safe DOM APIs, or secure backend design.

### Authentication and authorization
- Prefer BFF/session patterns when appropriate.
- Use OIDC Authorization Code with PKCE for browser clients.
- Never put client secrets in frontend code.
- Backend services must authorize every request and validate resource-level access.

### Sensitive data
- Mask account references and minimize data returned to the browser.
- Do not log tokens, identity documents, full account numbers, or payment payloads.
- Do not put secrets in source control, browser storage, or build-time frontend environment files.

## Security validation exercise
1. Inspect templates for unsafe HTML insertion.
2. Verify no real credentials or sensitive data are present.
3. Test that protected API endpoints reject unauthorized requests.
4. Review CSP and cookie settings with the backend/platform team.
5. Record findings in `security-review-checklist.md`.
