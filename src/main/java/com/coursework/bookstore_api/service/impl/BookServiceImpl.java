package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.dto.request.BookRequest;
import com.coursework.bookstore_api.dto.response.BooksResponse;
import com.coursework.bookstore_api.exceptions.BookNotFoundException;
import com.coursework.bookstore_api.exceptions.LanguageNotFoundException;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.repository.*;
import com.coursework.bookstore_api.service.BookService;
import com.coursework.bookstore_api.util.PageResponseFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final LanguageRepository languageRepository;
    private final GenreRepository genreRepository;

    @Override
    public List<BookDto> findAll() {
        return bookRepository.findAll().stream().map(BookDto::from).toList();
    }

    @Override
    public BooksResponse findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findAll(pageable);
        return PageResponseFormatter.createBooksPageResponse(pageNo, pageSize, booksPage);
    }

    @Override
    public BookDto findById(int id) {
        return BookDto.from(Objects.requireNonNull(bookRepository
                .findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"))));
    }

    @Override
    public BookDto save(BookRequest bookDto) {
        System.out.println(bookDto);
        Book book = Book.builder()
                .title(bookDto.getTitle())
                .price(bookDto.getPrice())
                .numberInStock(bookDto.getNumberInStock())
                .imageUrl(bookDto.getImageUrl())
                .language(languageRepository.findById(bookDto.getLanguageId())
                        .orElseThrow(() -> new LanguageNotFoundException("Language not found")))
                .authors(authorRepository.findAllById(bookDto.getAuthorIds()))
                .genres(genreRepository.findAllById(bookDto.getGenreIds()))
                .publisher(publisherRepository.findById(Integer.parseInt(bookDto.getPublisherId()))
                        .orElseThrow(() -> new RuntimeException("Publisher not found")))
                .build();

        book = bookRepository.save(book);

        return BookDto.from(book);
    }

    @Override
    public BookDto update(int id, BookRequest bookDto) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        existingBook.setTitle(bookDto.getTitle());
        existingBook.setPrice(bookDto.getPrice());
        existingBook.setNumberInStock(bookDto.getNumberInStock());
        existingBook.setImageUrl(bookDto.getImageUrl());
        existingBook.setLanguage(languageRepository.findById(bookDto.getLanguageId())
                        .orElseThrow(() -> new LanguageNotFoundException("Language not found")));
        existingBook.setAuthors(authorRepository.findAllById(bookDto.getAuthorIds()));
        existingBook.setGenres(genreRepository.findAllById(bookDto.getGenreIds()));
        existingBook.setPublisher(publisherRepository.findById(Integer.parseInt(bookDto.getPublisherId()))
                        .orElseThrow(() -> new RuntimeException("Publisher not found")));

        return BookDto.from(bookRepository.save(existingBook));
    }

    @Override
    public void deleteById(int id) {
        Book bookToDelete = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        bookToDelete.getReviews().clear();
        bookToDelete.getAuthors().clear();
        bookToDelete.getGenres().clear();
        bookToDelete.getOrderItems().clear();

        bookRepository.save(bookToDelete);

        bookRepository.delete(bookToDelete);
    }

    @Override
    public BooksResponse findAllByPublisherId(int publisherId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findAllByPublisherId(publisherId, pageable);
        return PageResponseFormatter.createBooksPageResponse(pageNo, pageSize, booksPage);
    }

    @Override
    public BooksResponse findAllByAuthorId(int authorId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findByAuthors_Id(authorId, pageable);
        return PageResponseFormatter.createBooksPageResponse(pageNo, pageSize, booksPage);
    }

    @Override
    public BooksResponse findAllByGenreId(int genreId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findByGenres_Id(genreId, pageable);
        return PageResponseFormatter.createBooksPageResponse(pageNo, pageSize, booksPage);
    }

    @Override
    public BooksResponse findAllByTitle(String title, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findByTitleContainingIgnoreCase(title, pageable);
        return PageResponseFormatter.createBooksPageResponse(pageNo, pageSize, booksPage);
    }

    @Override
    public BooksResponse getFilteredBooks(String title, Integer publisherId, Integer authorId, Integer genreId,
                                          int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        List<Book> filteredBooks;
        if (title == null || title.isEmpty()) {
            filteredBooks = bookRepository.findAll();
        } else {
            filteredBooks = bookRepository.findByTitleContainingIgnoreCase(title);
        }

        if (publisherId != null) {
            filteredBooks = filteredBooks.stream()
                .filter(book -> book.getPublisher().getId() == publisherId)
                .toList();
        }

        if (authorId != null) {
            filteredBooks = filteredBooks.stream()
                .filter(book -> book.getAuthors().stream()
                    .anyMatch(author -> author.getId() == authorId))
                .toList();
        }

        if (genreId != null) {
            filteredBooks = filteredBooks.stream()
                .filter(book -> book.getGenres().stream()
                    .anyMatch(genre -> genre.getId() == genreId))
                .toList();
        }

        Page<Book> books = bookRepository.findAllByIdIn(filteredBooks.stream().map(Book::getId).toList(), pageable);
        BooksResponse response = new BooksResponse();
        response.setContent(books.getContent().stream().map(BookDto::from).toList());
        response.setPageNo(pageNo);
        response.setPageSize(pageSize);
        response.setTotalElements(filteredBooks.size());
        response.setTotalPages((int) Math.ceil((double) filteredBooks.size() / pageSize));
        response.setLast(true);

        return response;
    }
}
