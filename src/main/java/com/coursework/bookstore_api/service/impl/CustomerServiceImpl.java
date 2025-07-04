package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.CustomerDto;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public List<CustomerDto> findAll() {
        return customerRepository.findAll().stream().map(CustomerDto::from).toList();
    }

    @Override
    public CustomerDto findById(int id) {
        return CustomerDto.from(Objects.requireNonNull(customerRepository
                .findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"))));
    }

    @Override
    public CustomerDto save(CustomerDto customerDto) {
        Customer customer = CustomerDto.toCustomer(customerDto);
        return CustomerDto.from(customerRepository.save(customer));
    }

    @Override
    public CustomerDto update(int id, CustomerDto customerDto) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));

        existingCustomer.setUsername(customerDto.getUsername());
        existingCustomer.setEmail(customerDto.getEmail());

        return CustomerDto.from(customerRepository.save(existingCustomer));
    }

    @Override
    public void deleteById(int id) {
        customerRepository.deleteById(id);
    }
}
