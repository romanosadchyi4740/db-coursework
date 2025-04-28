package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.AuthorDto;
import com.coursework.bookstore_api.dto.response.AuthorsResponse;
import com.coursework.bookstore_api.exceptions.AuthorNotFoundException;
import com.coursework.bookstore_api.model.Author;
import com.coursework.bookstore_api.repository.AuthorRepository;
import com.coursework.bookstore_api.service.AuthorService;
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
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    @Override
    public List<AuthorDto> findAll() {
        return authorRepository.findAll().stream().map(AuthorDto::from).toList();
    }

    @Override
    public AuthorsResponse findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Author> authorsPage = authorRepository.findAll(pageable);
        return PageResponseFormatter.createAuthorsPageResponse(pageNo, pageSize, authorsPage);
    }

    @Override
    public AuthorDto findById(int id) {
        return AuthorDto.from(Objects.requireNonNull(authorRepository
                .findById(id)
                .orElseThrow(() -> new AuthorNotFoundException("Author not found"))));
    }

    @Override
    public AuthorDto save(AuthorDto authorDto) {
        Author author = AuthorDto.toAuthor(authorDto);
        return AuthorDto.from(authorRepository.save(author));
    }

    @Override
    public AuthorDto update(int id, AuthorDto authorDto) {
        Author existingAuthor = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException("Author not found"));
        existingAuthor.setName(authorDto.getName());

        return AuthorDto.from(authorRepository.save(existingAuthor));
    }

    @Override
    public void deleteById(int id) {
        authorRepository.deleteById(id);
    }
}
