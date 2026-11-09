package com.ramuboya.banking.account;

import com.ramuboya.banking.customer.CustomerRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class BankAccountController {
    private final AccountRepository accounts;
    private final CustomerRepository customers;

    public BankAccountController(AccountRepository accounts, CustomerRepository customers) {
        this.accounts = accounts;
        this.customers = customers;
    }

    @GetMapping
    public List<BankAccount> findAll() {
        return accounts.findAllByOrderByIdDesc();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BankAccount create(@Valid @RequestBody CreateAccountRequest request) {
        var customer = customers.findById(request.customerId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
        return accounts.save(new BankAccount(
            request.accountNumber(), request.accountType(), request.availableBalance(), customer
        ));
    }
}
