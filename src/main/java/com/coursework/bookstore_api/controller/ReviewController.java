package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.ReviewDto;
import com.coursework.bookstore_api.service.ReviewService;
import com.coursework.bookstore_api.util.datageneration.ReviewGenerator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "ReviewController", description = "Provides all operations with reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/reviews")
    @Operation(summary = "Finding all the reviews from the DB",
            description = "Gets all existing reviews from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ReviewDto[].class))
            })
    })
    public ResponseEntity<List<ReviewDto>> getReviews() {
        return ResponseEntity.ok(reviewService.findAll());
    }

    @GetMapping("/reviews/{reviewId}")
    @Operation(summary = "Finding a specific review from the DB",
            description = "Gets a specific review by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ReviewDto.class))
            })
    })
    public ResponseEntity<ReviewDto> getReview(@PathVariable int reviewId) {
        return ResponseEntity.ok(reviewService.findById(reviewId));
    }

    @PostMapping("/reviews")
    @Operation(summary = "Creating a new review",
            description = "Creates a new review in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ReviewDto.class))
            })
    })
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        return new ResponseEntity<>(reviewService.save(reviewDto), HttpStatus.CREATED);
    }

    @PutMapping("/reviews/{reviewId}")
    @Operation(summary = "Updating an existing review",
            description = "Updates an existing review in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = ReviewDto.class))
            })
    })
    public ResponseEntity<ReviewDto> updateReview(@PathVariable int reviewId, @RequestBody ReviewDto reviewDto) {
        return ResponseEntity.ok(reviewService.update(reviewId, reviewDto));
    }

    @DeleteMapping("/reviews/{reviewId}")
    @Operation(summary = "Deleting a review",
            description = "Deletes a review from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        reviewService.deleteById(reviewId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reviews/generate")
    @Operation(summary = "Generating reviews",
            description = "Generates reviews in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    public ResponseEntity<String> generateReviews(@RequestParam(name = "reviewsCount") int reviewsCount) {
        reviewService.generateReviews(reviewsCount);
        return ResponseEntity.ok("Reviews generated");
    }
}