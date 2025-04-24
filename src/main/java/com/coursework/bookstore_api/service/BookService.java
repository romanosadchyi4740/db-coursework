package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.dto.request.BookRequest;
import com.coursework.bookstore_api.dto.response.BooksResponse;

import java.util.List;

public interface BookService {
    List<BookDto> findAll();

    BooksResponse findAll(int pageNo, int pageSize);

    BookDto findById(int id);

    BookDto save(BookRequest bookDto);

    BookDto update(int id, BookRequest bookDto);

    void deleteById(int id);
}
