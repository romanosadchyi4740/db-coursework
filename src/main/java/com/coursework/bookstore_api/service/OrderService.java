package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.OrderDto;

import java.util.List;

public interface OrderService {
    List<OrderDto> findAll();
    
    OrderDto findById(int id);
    
    OrderDto save(OrderDto orderDto);
    
    OrderDto update(int id, OrderDto orderDto);
    
    void deleteById(int id);
}