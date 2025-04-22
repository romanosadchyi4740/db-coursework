package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Author;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Genre;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class BookDto {
    private int id;
    private String title;
    private List<String> authorNames = new ArrayList<>();
    private String publisher;
    private double price;
    private int numberInStock;
    private String language;
    private List<String> genreNames;

    public static BookDto from(Book book) {
        BookDto dto = new BookDto();
        dto.id = book.getId();
        dto.title = book.getTitle();
        dto.authorNames = book.getAuthors().stream()
                .map(Author::getName).collect(Collectors.toList());
        dto.publisher = book.getPublisher().getPublisherName();
        dto.price = book.getPrice();
        dto.numberInStock = book.getNumberInStock();
        dto.language = book.getLanguage().getLanguage();
        dto.genreNames = book.getGenres().stream().map(Genre::getGenreName).toList();
        return dto;
    }

    public static Book toBook(BookDto dto) {
        Book book = new Book();
        book.setId(dto.id);
        book.setTitle(dto.title);
        return book;
    }
}
