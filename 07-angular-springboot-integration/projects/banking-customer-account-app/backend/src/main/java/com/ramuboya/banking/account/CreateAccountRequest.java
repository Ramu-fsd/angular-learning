package com.ramuboya.banking.account;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record CreateAccountRequest(
    @NotBlank @Size(max = 24) String accountNumber,
    @NotBlank @Pattern(regexp = "SAVINGS|CURRENT") String accountType,
    @NotNull @DecimalMin("0.00") BigDecimal availableBalance,
    @NotNull @Positive Long customerId
) {}
