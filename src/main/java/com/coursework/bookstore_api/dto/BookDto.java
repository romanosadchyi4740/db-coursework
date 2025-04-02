package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Book;

public class BookDto {
    private int id;
    private String title;
//    private Author author = null;
//    private String isbn = null;
//    private Publisher publisher = null;

    public static BookDto from(Book book) {
        BookDto dto = new BookDto();
        dto.id = book.getId();
        dto.title = book.getTitle();
        return dto;
    }

    public static Book toBook(BookDto dto) {
        Book book = new Book();
        book.setId(dto.id);
        book.setTitle(dto.title);
        return book;
    }
}
