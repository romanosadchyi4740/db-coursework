package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
}