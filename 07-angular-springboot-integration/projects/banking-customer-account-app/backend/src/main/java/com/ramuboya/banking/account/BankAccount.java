package com.ramuboya.banking.account;

import com.ramuboya.banking.customer.Customer;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "bank_accounts")
public class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 24)
    private String accountNumber;

    @Column(nullable = false, length = 24)
    private String accountType;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal availableBalance;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    protected BankAccount() {}

    public BankAccount(String accountNumber, String accountType, BigDecimal availableBalance, Customer customer) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.availableBalance = availableBalance;
        this.customer = customer;
    }

    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getAccountType() { return accountType; }
    public BigDecimal getAvailableBalance() { return availableBalance; }
    public Long getCustomerId() { return customer.getId(); }
}
