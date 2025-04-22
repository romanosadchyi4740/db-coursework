package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Customer;
import lombok.Data;

@Data
public class CustomerDto {
    private int id;
    private String username;
    private String lastName;
    private String email;

    public static CustomerDto from(Customer customer) {
        CustomerDto dto = new CustomerDto();
        dto.id = customer.getId();
        dto.username = customer.getUsername();
        dto.email = customer.getEmail();
        return dto;
    }

    public static Customer toCustomer(CustomerDto dto) {
        Customer customer = new Customer();
        customer.setId(dto.id);
        customer.setUsername(dto.username);
        customer.setEmail(dto.email);
        return customer;
    }
}