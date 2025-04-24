package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.OrderItem;
import lombok.Data;

@Data
public class OrderItemDto {
    private int id;
    private int bookId;
    private String bookTitle;
    private int quantity;
    private double price;

    public static OrderItemDto from(OrderItem orderItem) {
        OrderItemDto dto = new OrderItemDto();
        dto.id = orderItem.getId();
        dto.bookId = orderItem.getBook().getId();
        dto.bookTitle = orderItem.getBook().getTitle();
        dto.quantity = orderItem.getQuantity();
        dto.price = orderItem.getPrice();
        return dto;
    }

    public static OrderItem toOrderItem(OrderItemDto dto, Book book) {
        OrderItem orderItem = new OrderItem();
        orderItem.setId(dto.id);
        orderItem.setBook(book);
        orderItem.setQuantity(dto.quantity);
        orderItem.setPrice(dto.price);
        // Order needs to be set separately
        return orderItem;
    }
}