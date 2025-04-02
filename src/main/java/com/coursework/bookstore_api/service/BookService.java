package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.BookDto;

import java.util.List;

public interface BookService {
    List<BookDto> findAll();

    BookDto findById(int id);
}
