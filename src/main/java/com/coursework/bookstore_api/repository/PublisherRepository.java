package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
}