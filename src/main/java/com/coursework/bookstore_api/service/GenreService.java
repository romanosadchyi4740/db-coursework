package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.GenreDto;

import java.util.List;

public interface GenreService {
    List<GenreDto> findAll();
    
    GenreDto findById(int id);
    
    GenreDto save(GenreDto genreDto);
    
    GenreDto update(int id, GenreDto genreDto);
    
    void deleteById(int id);
}