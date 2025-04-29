package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Long> {
}