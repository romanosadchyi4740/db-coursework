package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}