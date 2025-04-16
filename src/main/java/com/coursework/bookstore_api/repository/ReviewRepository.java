package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}