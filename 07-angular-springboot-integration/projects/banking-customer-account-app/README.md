# Banking Customer & Account Management

A local full-stack starter demonstrating Angular consuming Spring Boot REST APIs for customer and account servicing.

## Stack

- Java 21
- Spring Boot 3.x
- Spring Web
- Spring Data JPA
- Jakarta Bean Validation
- H2 in-memory database
- Angular standalone APIs and HttpClient

## Start backend

```bash
cd backend
mvn spring-boot:run
```

Health: `GET http://localhost:8080/api/health`

## Start frontend

Generate a local Angular workspace using your installed CLI, then copy `frontend/src` and `frontend/proxy.conf.json` into it. Configure the Angular dev-server proxy as shown in the parent README.

```bash
npm install
ng serve --open
```

## End-to-end validation

- Load customer and account data from backend.
- Add a customer with valid name/email.
- Try blank name or invalid email and inspect the returned validation message.
- Create an account for a customer ID that exists.
- Try an account request with a nonexistent customer ID and confirm a 404 response.
- Stop backend and confirm frontend shows a readable error state.

## Notes

This is a learning demo. H2 data is in-memory. No authentication is implemented in this runnable sample. Add Spring Security/OIDC integration before exposing any real data.
