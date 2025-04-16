package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.AuthorDto;

import java.util.List;

public interface AuthorService {
    List<AuthorDto> findAll();
    
    AuthorDto findById(int id);
    
    AuthorDto save(AuthorDto authorDto);
    
    AuthorDto update(int id, AuthorDto authorDto);
    
    void deleteById(int id);
}