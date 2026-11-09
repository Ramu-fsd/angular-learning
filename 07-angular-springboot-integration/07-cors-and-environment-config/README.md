# CORS and environment configuration

For local development, the supplied Angular proxy forwards `/api` to Spring Boot. This avoids opening permissive CORS rules just for local development.

Proxy example:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

For production:
- Configure the allowed frontend origin explicitly at the API gateway or backend.
- Restrict methods and headers to what is needed.
- Do not use wildcard origins with credentialed requests.
- CORS is a browser access policy, not authentication or authorization.
- Use environment-specific configuration for public API base URLs; never put secrets in Angular environment files because frontend bundles are public.
