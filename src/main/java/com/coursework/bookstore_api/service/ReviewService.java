package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> findAll();
    
    ReviewDto findById(int id);
    
    ReviewDto save(ReviewDto reviewDto);
    
    ReviewDto update(int id, ReviewDto reviewDto);
    
    void deleteById(int id);

    void generateReviews(int reviewsCount);
}