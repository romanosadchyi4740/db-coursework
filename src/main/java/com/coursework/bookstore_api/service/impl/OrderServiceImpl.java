package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.OrderDto;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.exceptions.OrderNotFoundException;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Order;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.repository.OrderRepository;
import com.coursework.bookstore_api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    @Override
    public List<OrderDto> findAll() {
        return orderRepository.findAll().stream().map(OrderDto::from).collect(Collectors.toList());
    }

    @Override
    public OrderDto findById(int id) {
        return OrderDto.from(Objects.requireNonNull(orderRepository
                .findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"))));
    }

    @Override
    public OrderDto save(OrderDto orderDto) {
        Order order = OrderDto.toOrder(orderDto);

        // Set the customer for the order
        Customer customer = customerRepository.findById(orderDto.getCustomerId())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        order.setCustomer(customer);

        return OrderDto.from(orderRepository.save(order));
    }

    @Override
    public OrderDto update(int id, OrderDto orderDto) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"));

        existingOrder.setAmount(orderDto.getAmount());
        existingOrder.setPaymentDate(orderDto.getPaymentDate());

        // Update the customer if it has changed
        if (existingOrder.getCustomer().getId() != orderDto.getCustomerId()) {
            Customer customer = customerRepository.findById(orderDto.getCustomerId())
                    .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
            existingOrder.setCustomer(customer);
        }

        return OrderDto.from(orderRepository.save(existingOrder));
    }

    @Override
    public void deleteById(int id) {
        orderRepository.deleteById(id);
    }
}
