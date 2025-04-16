package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.LanguageDto;

import java.util.List;

public interface LanguageService {
    List<LanguageDto> findAll();
    
    LanguageDto findById(int id);
    
    LanguageDto save(LanguageDto languageDto);
    
    LanguageDto update(int id, LanguageDto languageDto);
    
    void deleteById(int id);
}