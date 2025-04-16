package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.ReviewDto;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.exceptions.ReviewNotFoundException;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Review;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.repository.ReviewRepository;
import com.coursework.bookstore_api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;

    @Override
    public List<ReviewDto> findAll() {
        return reviewRepository.findAll().stream().map(ReviewDto::from).collect(Collectors.toList());
    }

    @Override
    public ReviewDto findById(int id) {
        return ReviewDto.from(Objects.requireNonNull(reviewRepository
                .findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found"))));
    }

    @Override
    public ReviewDto save(ReviewDto reviewDto) {
        Review review = ReviewDto.toReview(reviewDto);

        // Set the reviewer for the review
        Customer reviewer = customerRepository.findById(reviewDto.getReviewerId())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        review.setReviewer(reviewer);

        return ReviewDto.from(reviewRepository.save(review));
    }

    @Override
    public ReviewDto update(int id, ReviewDto reviewDto) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found"));

        existingReview.setText(reviewDto.getText());

        // Update reviewer if it has changed
        if (existingReview.getReviewer().getId() != reviewDto.getReviewerId()) {
            Customer reviewer = customerRepository.findById(reviewDto.getReviewerId())
                    .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
            existingReview.setReviewer(reviewer);
        }

        return ReviewDto.from(reviewRepository.save(existingReview));
    }

    @Override
    public void deleteById(int id) {
        reviewRepository.deleteById(id);
    }
}
