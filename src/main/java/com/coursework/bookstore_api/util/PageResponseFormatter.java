package com.coursework.bookstore_api.util;

import com.coursework.bookstore_api.dto.AuthorDto;
import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.dto.response.AuthorsResponse;
import com.coursework.bookstore_api.dto.response.BooksResponse;
import com.coursework.bookstore_api.model.Author;
import com.coursework.bookstore_api.model.Book;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;

@UtilityClass
public class PageResponseFormatter {
    public static BooksResponse createBooksPageResponse(int pageNo, int pageSize, Page<Book> booksPage) {
        List<Book> books = booksPage.getContent();
        List<BookDto> content = books.stream().map(BookDto::from).toList();

        BooksResponse booksResponse = new BooksResponse();
        booksResponse.setContent(content);
        booksResponse.setPageNo(pageNo);
        booksResponse.setPageSize(pageSize);
        booksResponse.setTotalElements(booksPage.getTotalElements());
        booksResponse.setTotalPages(booksPage.getTotalPages());
        booksResponse.setLast(booksPage.isLast());

        return booksResponse;
    }

    public static AuthorsResponse createAuthorsPageResponse(int pageNo, int pageSize, Page<Author> authorsPage) {
        List<Author> authors = authorsPage.getContent();
        List<AuthorDto> content = authors.stream().map(AuthorDto::from).toList();

        AuthorsResponse authorsResponse = new AuthorsResponse();
        authorsResponse.setContent(content);
        authorsResponse.setPageNo(pageNo);
        authorsResponse.setPageSize(pageSize);
        authorsResponse.setTotalElements(authorsPage.getTotalElements());
        authorsResponse.setTotalPages(authorsPage.getTotalPages());
        authorsResponse.setLast(authorsPage.isLast());

        return authorsResponse;
    }
}
