package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
