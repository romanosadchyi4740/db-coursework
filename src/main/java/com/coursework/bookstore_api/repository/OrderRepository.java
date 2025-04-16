package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}