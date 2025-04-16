package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}