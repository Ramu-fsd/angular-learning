# Frontend Security Review Checklist

- [ ] No secrets or private keys are bundled into browser assets.
- [ ] No real customer or payment data is committed.
- [ ] No untrusted value is inserted using unsafe HTML APIs.
- [ ] No unnecessary `bypassSecurityTrust...` calls exist.
- [ ] CSP is defined and tested in the deployed environment.
- [ ] Cookie settings are Secure, HttpOnly, and SameSite as appropriate.
- [ ] CSRF defenses are present for cookie-authenticated state changes.
- [ ] API authorization is enforced server-side for every operation.
- [ ] Resource-level access and maker-checker controls are enforced server-side.
- [ ] Error messages do not expose stack traces or internal service details.
- [ ] Logs do not contain tokens, full account numbers, identity documents, or payment payloads.
- [ ] Dependencies are scanned and kept up to date.
- [ ] Threat model and security test evidence are documented.
