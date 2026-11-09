# Security and non-functional requirements

## Security

- Authenticate through enterprise OIDC/OAuth2.
- Validate authorization at backend APIs for every protected operation.
- Maintain an explicit allowlist of trusted remote origins.
- Configure Content Security Policy and appropriate CORS rules.
- Avoid loading remote code from untrusted or user-controlled URLs.
- Keep secrets out of browser bundles and federation manifests.
- Define compatibility and trust review for every remote release.

## Non-functional requirements

- **Availability:** define shell and remote availability objectives separately.
- **Performance:** lazy-load remotes and measure initial shell and remote navigation performance.
- **Resilience:** show a useful fallback when a remote fails to load.
- **Scalability:** allow teams to deploy remote applications independently.
- **Compatibility:** establish shared Angular dependency and version policies.
- **Observability:** correlate shell navigation, remote loading, and API requests.
- **Accessibility:** keyboard navigation, semantic landmarks, focus management, and contrast.
- **Release safety:** version assets immutably and support remote rollback.
