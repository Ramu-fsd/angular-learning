# Angular and Spring Boot Integration

The included `BankingApiService` demonstrates typed `HttpClient` calls against `/api/v1`.

## Suggested Spring Boot service boundaries

- `customer-service`: authenticated customer profile and preferences.
- `account-service`: account list, account entitlements, balances.
- `transaction-service`: paginated transaction history.
- `beneficiary-service`: beneficiary registration and verification workflow.
- `service-request-service`: customer service requests.

## Example Spring Boot endpoint contract

```java
@RestController
@RequestMapping("/api/v1/accounts")
class AccountController {
    private final AccountQueryService accountQueryService;

    AccountController(AccountQueryService accountQueryService) {
        this.accountQueryService = accountQueryService;
    }

    @GetMapping
    AccountPageResponse getAccounts(Authentication authentication) {
        // Resolve customer identity from the authenticated principal.
        // Never trust a customer ID supplied by the browser.
        return accountQueryService.findAccounts(authentication.getName());
    }
}
```

Use DTOs rather than exposing persistence entities. Validate inputs, authorize resource ownership, return consistent error envelopes, and emit audit events for sensitive operations.

## Local development

Configure an Angular dev-server proxy for `/api` to your Spring Boot local port. Keep API host configuration outside source code and never add credentials to the proxy configuration.
