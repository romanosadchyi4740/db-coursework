package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Author;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Genre;
import com.coursework.bookstore_api.model.Review;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BookDto {
    private int id;
    private String title;
    private List<String> authorNames = new ArrayList<>();
    private List<Integer> authorIds = new ArrayList<>();
    private String publisher;
    private String publisherId;
    private double price;
    private int numberInStock;
    private String imageUrl;
    private String language;
    private int languageId;
    private List<String> genreNames = new ArrayList<>();
    private List<Integer> genreIds = new ArrayList<>();
    private List<Integer> reviewIds = new ArrayList<>();

    public static BookDto from(Book book) {
        BookDto dto = new BookDto();
        dto.id = book.getId();
        dto.title = book.getTitle();
        dto.authorNames = book.getAuthors().stream().map(Author::getName).toList();
        dto.authorIds = book.getAuthors().stream().map(Author::getId).toList();
        dto.publisher = book.getPublisher().getPublisherName();
        dto.publisherId = String.valueOf(book.getPublisher().getId());
        dto.price = book.getPrice();
        dto.numberInStock = book.getNumberInStock();
        dto.imageUrl = book.getImageUrl();
        dto.language = book.getLanguage().getLanguage();
        dto.languageId = book.getLanguage().getId();
        dto.genreNames = book.getGenres().stream().map(Genre::getGenreName).toList();
        dto.genreIds = book.getGenres().stream().map(Genre::getId).toList();
        if (book.getReviews() == null)
            dto.reviewIds = new ArrayList<>();
        else
            dto.reviewIds = book.getReviews().stream().map(Review::getId).toList();
        return dto;
    }

    public static Book toBook(BookDto dto) {
        Book book = new Book();
        book.setId(dto.id);
        book.setTitle(dto.title);
        return book;
    }
}
