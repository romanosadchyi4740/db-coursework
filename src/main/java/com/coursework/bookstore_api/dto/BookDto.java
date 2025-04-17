package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Book;
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

    public static BookDto from(Book book) {
        BookDto dto = new BookDto();
        dto.id = book.getId();
        dto.title = book.getTitle();
        dto.authorNames = book.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName()).collect(Collectors.toList());
        dto.publisher = book.getPublisher().getPublisherName();
        return dto;
    }

    public static Book toBook(BookDto dto) {
        Book book = new Book();
        book.setId(dto.id);
        book.setTitle(dto.title);
        return book;
    }
}
