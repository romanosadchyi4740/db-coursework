package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.CustomerDto;

import java.util.List;

public interface CustomerService {
    List<CustomerDto> findAll();
    
    CustomerDto findById(int id);
    
    CustomerDto save(CustomerDto customerDto);
    
    CustomerDto update(int id, CustomerDto customerDto);
    
    void deleteById(int id);
}