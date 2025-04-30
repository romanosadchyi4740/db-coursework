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

    BooksResponse findAllByPublisherId(int publisherId, int pageNo, int pageSize);

    BooksResponse findAllByAuthorId(int authorId, int pageNo, int pageSize);

    BooksResponse findAllByGenreId(int genreId, int pageNo, int pageSize);

    BooksResponse findAllByTitle(String title, int pageNo, int pageSize);

//    BooksResponse getFilteredBooks(String title, Integer publisherId, Integer authorId, Integer genreId, int pageNo, int pageSize);
}
