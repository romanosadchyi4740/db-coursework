package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.PublisherDto;

import java.util.List;

public interface PublisherService {
    List<PublisherDto> findAll();
    
    PublisherDto findById(int id);
    
    PublisherDto save(PublisherDto publisherDto);
    
    PublisherDto update(int id, PublisherDto publisherDto);
    
    void deleteById(int id);
}