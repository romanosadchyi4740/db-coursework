package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
}