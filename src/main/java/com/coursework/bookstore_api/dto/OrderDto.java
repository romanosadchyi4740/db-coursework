package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Order;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class OrderDto {
    private int id;
    private double amount;
    private Date paymentDate;
    private int customerId;
    private String customerName;
    private List<OrderItemDto> orderItems = new ArrayList<>();

    public static OrderDto from(Order order) {
        OrderDto dto = new OrderDto();
        dto.id = order.getId();
        dto.amount = order.getAmount();
        dto.paymentDate = order.getPaymentDate();
        dto.customerId = order.getCustomer().getId();
        dto.customerName = order.getCustomer().getUsername();
        dto.orderItems = order.getOrderItems().stream()
                .map(OrderItemDto::from)
                .toList();
        return dto;
    }

    public static Order toOrder(OrderDto dto) {
        Order order = new Order();
        order.setId(dto.id);
        order.setAmount(dto.amount);
        order.setPaymentDate(dto.paymentDate);
        // Customer and OrderItems need to be set separately
        return order;
    }
}
