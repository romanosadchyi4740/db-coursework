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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public List<CustomerDto> findAll() {
        return customerRepository.findAll().stream().map(CustomerDto::from).collect(Collectors.toList());
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

        existingCustomer.setFirstName(customerDto.getFirstName());
        existingCustomer.setLastName(customerDto.getLastName());
        existingCustomer.setUsername(customerDto.getUsername());

        return CustomerDto.from(customerRepository.save(existingCustomer));
    }

    @Override
    public void deleteById(int id) {
        customerRepository.deleteById(id);
    }
}
