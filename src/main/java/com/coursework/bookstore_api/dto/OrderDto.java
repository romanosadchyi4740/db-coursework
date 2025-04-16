package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Order;
import lombok.Data;

import java.util.Date;

@Data
public class OrderDto {
    private int id;
    private double amount;
    private Date paymentDate;
    private int customerId;
    private String customerName;

    public static OrderDto from(Order order) {
        OrderDto dto = new OrderDto();
        dto.id = order.getId();
        dto.amount = order.getAmount();
        dto.paymentDate = order.getPaymentDate();
        dto.customerId = order.getCustomer().getId();
        dto.customerName = order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName();
        return dto;
    }

    public static Order toOrder(OrderDto dto) {
        Order order = new Order();
        order.setId(dto.id);
        order.setAmount(dto.amount);
        order.setPaymentDate(dto.paymentDate);
        // Customer needs to be set separately
        return order;
    }
}