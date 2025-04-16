package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Customer;
import lombok.Data;

@Data
public class CustomerDto {
    private int id;
    private String firstName;
    private String lastName;
    private String username;

    public static CustomerDto from(Customer customer) {
        CustomerDto dto = new CustomerDto();
        dto.id = customer.getId();
        dto.firstName = customer.getFirstName();
        dto.lastName = customer.getLastName();
        dto.username = customer.getUsername();
        return dto;
    }

    public static Customer toCustomer(CustomerDto dto) {
        Customer customer = new Customer();
        customer.setId(dto.id);
        customer.setFirstName(dto.firstName);
        customer.setLastName(dto.lastName);
        customer.setUsername(dto.username);
        return customer;
    }
}