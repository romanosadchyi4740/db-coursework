package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.repository.BookRepository;
import com.coursework.bookstore_api.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    public List<BookDto> findAll() {
        return bookRepository.findAll().stream().map(BookDto::from).collect(Collectors.toList());
    }

    @Override
    public BookDto findById(int id) {
        return BookDto.from(Objects.requireNonNull(bookRepository.findById(id).orElse(null)));
    }
}
