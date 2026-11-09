# 07 - Angular + Spring Boot Integration

**Author:** Ramu Boya  
**GitHub:** https://github.com/Ramu-fsd  
**LinkedIn:** https://www.linkedin.com/in/ramuboya

This category demonstrates production-minded integration between an Angular frontend and Spring Boot REST APIs. Examples use banking, customer onboarding, account servicing, and payment operations.

## Learning path

1. `01-httpclient-rest-integration` - typed API services, GET/POST/PUT/DELETE.
2. `02-reactive-forms-api` - create/update customer workflows and server validation.
3. `03-authentication-and-authorization` - JWT concepts, login flow, route guards.
4. `04-http-interceptors-and-errors` - correlation IDs, authorization headers, normalized errors.
5. `05-pagination-and-filtering` - server-side pagination, sorting, and search.
6. `06-file-upload-download` - multipart upload and file response handling.
7. `07-cors-and-environment-config` - local proxy, CORS, environment configuration.
8. `08-api-security` - validation, authorization, CSRF/CORS boundaries, secrets.
9. `projects/banking-customer-account-app` - runnable full-stack starter.

## Runnable full-stack project

The runnable starter includes:
- Angular standalone frontend source
- Spring Boot 3 / Java 21 backend source
- Maven configuration
- REST endpoints for customers and accounts
- H2 in-memory database for local learning
- Angular API service and customer/account dashboard
- build, run, and validation instructions

### Prerequisites

- Java 21
- Maven 3.9+
- Node.js LTS
- npm
- Angular CLI (or generate workspace as described below)

### Backend run

Open a terminal in:

`projects/banking-customer-account-app/backend`

Run:

```bash
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`  
Health endpoint: `http://localhost:8080/api/health`

### Frontend workspace setup

The frontend source is provided under `frontend/src`. Generate a workspace with your installed Angular CLI to avoid locking the sample to one CLI patch version:

```bash
ng new banking-customer-account-app --standalone --routing --style=css
cd banking-customer-account-app
```

Replace the generated `src` folder with `projects/banking-customer-account-app/frontend/src`. Replace the generated `proxy.conf.json` with the supplied one. Keep the CLI-generated workspace configuration and add this proxy setting to the `serve` target if your Angular CLI did not configure it automatically:

```json
"options": {
  "proxyConfig": "proxy.conf.json"
}
```

Run:

```bash
npm install
ng serve --open
```

The Angular development server proxies `/api` requests to Spring Boot at `localhost:8080`.

### Build

Backend:

```bash
mvn clean package
```

Frontend:

```bash
ng build
```

### Validate end to end

1. Start the Spring Boot backend.
2. Call `http://localhost:8080/api/health` and confirm an `UP` response.
3. Start Angular and open the application.
4. Confirm the customer and account tables load from the API.
5. Add a customer with valid details and confirm it appears in the list.
6. Submit an invalid customer (blank name or malformed email) and confirm server-side validation is returned.
7. Refresh the browser and confirm persisted H2 data remains while the backend is running.
8. Create an account for an existing customer and confirm it appears in the account list.
9. Stop the backend and refresh; verify the frontend displays an API error instead of silently showing stale data.

## Important security notes

- This is a local learning starter, not a production banking system.
- It intentionally does not implement real login or issue JWTs. Authentication is covered in the concept modules.
- H2 is in-memory and resets when the backend process restarts.
- CORS is not opened broadly; local development uses the Angular proxy.
- Real authorization, customer identity verification, audit logging, encryption, rate limiting, and transaction controls belong on the backend.
- Never commit credentials, real customer data, access tokens, or production environment files.
