package com.ramuboya.banking.account;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AccountRepository extends JpaRepository<BankAccount, Long> {
    List<BankAccount> findAllByOrderByIdDesc();
}
