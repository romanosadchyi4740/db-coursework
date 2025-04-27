package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.OrderDto;
import com.coursework.bookstore_api.dto.OrderItemDto;
import com.coursework.bookstore_api.exceptions.BookNotFoundException;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.exceptions.OrderNotFoundException;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Order;
import com.coursework.bookstore_api.model.OrderItem;
import com.coursework.bookstore_api.repository.BookRepository;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.repository.OrderRepository;
import com.coursework.bookstore_api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final BookRepository bookRepository;

    @Override
    public List<OrderDto> findAll() {
        return orderRepository.findAll().stream().map(OrderDto::from).toList();
    }

    @Override
    public OrderDto findById(int id) {
        return OrderDto.from(Objects.requireNonNull(orderRepository
                .findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"))));
    }

    @Override
    @Transactional
    public OrderDto save(OrderDto orderDto) {
        Order order = OrderDto.toOrder(orderDto);

        // Set the current date if not provided
        if (order.getPaymentDate() == null) {
            order.setPaymentDate(new Date());
        }

        // Set the customer for the order
        Customer customer = customerRepository.findByUsername(orderDto.getCustomerName())
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        order.setCustomer(customer);

        // Save the order first to get an ID
        order = orderRepository.save(order);

        // Process order items
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemDto itemDto : orderDto.getOrderItems()) {
            Book book = bookRepository.findById(itemDto.getBookId())
                    .orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + itemDto.getBookId()));

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setBook(book);
            orderItem.setOrder(order);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(book.getPrice()); // Use current book price

            orderItems.add(orderItem);

            // Add to total amount
            totalAmount += book.getPrice() * itemDto.getQuantity();
        }

        // Update order with items and total amount
        order.setOrderItems(orderItems);
        order.setAmount(totalAmount);

        // Save updated order
        order = orderRepository.save(order);

        return OrderDto.from(order);
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

    @Override
    public List<OrderDto> findAllByCustomerId(int customerId) {
        return orderRepository.findAllByCustomer_Id(customerId).stream().map(OrderDto::from).toList();
    }
}
