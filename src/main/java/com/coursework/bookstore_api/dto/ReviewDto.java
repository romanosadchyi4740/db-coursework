package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Review;
import lombok.Data;

@Data
public class ReviewDto {
    private int id;
    private String text;
    private int reviewerId;
    private String reviewerName;

    public static ReviewDto from(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.id = review.getId();
        dto.text = review.getText();
        dto.reviewerId = review.getReviewer().getId();
        dto.reviewerName = review.getReviewer().getFirstName() + " " + review.getReviewer().getLastName();
        return dto;
    }

    public static Review toReview(ReviewDto dto) {
        Review review = new Review();
        review.setId(dto.id);
        review.setText(dto.text);
        // Reviewer needs to be set separately
        return review;
    }
}