package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.dto.response.BooksResponse;
import com.coursework.bookstore_api.exceptions.BookNotFoundException;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Publisher;
import com.coursework.bookstore_api.repository.AuthorRepository;
import com.coursework.bookstore_api.repository.BookRepository;
import com.coursework.bookstore_api.repository.PublisherRepository;
import com.coursework.bookstore_api.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;

    @Override
    public List<BookDto> findAll() {
        return bookRepository.findAll().stream().map(BookDto::from).collect(Collectors.toList());
    }

    @Override
    public BooksResponse findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Book> booksPage = bookRepository.findAll(pageable);
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

    @Override
    public BookDto findById(int id) {
        return BookDto.from(Objects.requireNonNull(bookRepository
                .findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"))));
    }

    @Override
    public BookDto save(BookDto bookDto) {
        Book book = BookDto.toBook(bookDto);

        // Set the publisher for the book
        if (bookDto.getPublisher() != null) {
            Publisher publisher = publisherRepository.findById(Integer.parseInt(bookDto.getPublisher()))
                    .orElseThrow(() -> new RuntimeException("Publisher not found"));
            book.setPublisher(publisher);
        }

        // Save the book first to get an ID
        book = bookRepository.save(book);

        return BookDto.from(book);
    }

    @Override
    public BookDto update(int id, BookDto bookDto) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        existingBook.setTitle(bookDto.getTitle());

        // Update the publisher if it has changed
        if (bookDto.getPublisher() != null) {
            Publisher publisher = publisherRepository.findById(Integer.parseInt(bookDto.getPublisher()))
                    .orElseThrow(() -> new RuntimeException("Publisher not found"));
            existingBook.setPublisher(publisher);
        }

        return BookDto.from(bookRepository.save(existingBook));
    }

    @Override
    public void deleteById(int id) {
        bookRepository.deleteById(id);
    }
}
