package com.coursework.bookstore_api.util.datageneration;

import com.coursework.bookstore_api.exceptions.BookNotFoundException;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Review;
import com.coursework.bookstore_api.repository.BookRepository;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.repository.ReviewRepository;

import java.util.List;
import java.util.Random;

public class ReviewGenerator {
    private static final String[] reviewPhrases = {
            "Amazing book!", "Really enjoyed the plot.", "Characters were well developed.",
            "A bit slow in the middle but worth it.", "Highly recommended!",
            "Didn't meet my expectations.", "Loved the writing style.",
            "Would read again.", "Not my cup of tea.", "Five stars!"
    };
    private static final Random random = new Random();

    public static void generateReviews(
            int reviewCount,
            ReviewRepository reviewRepository,
            BookRepository bookRepository,
            CustomerRepository customerRepository) {
        List<Integer> bookIds = bookRepository.findAll().stream().map(Book::getId).toList();
        List<Integer> customerIds = customerRepository.findAll().stream().map(Customer::getId).toList();

        for (int i = 0; i < reviewCount; i++) {
            int bookId = bookIds.get(random.nextInt(bookIds.size()));
            int customerId = customerIds.get(random.nextInt(customerIds.size()));
            String reviewText = reviewPhrases[random.nextInt(reviewPhrases.length)];

            Review review = new Review();
            review.setBook(bookRepository.findById(bookId)
                    .orElseThrow(() ->
                            new BookNotFoundException(">" + bookId + "< book not found in the database.")));
            review.setReviewer(customerRepository.findById(customerId)
                    .orElseThrow(() ->
                            new CustomerNotFoundException(">" + customerId + "< customer not found in the database.")));
            review.setText(reviewText);

            reviewRepository.save(review);
        }
    }
}
