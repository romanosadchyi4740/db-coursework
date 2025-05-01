package com.coursework.bookstore_api.util.datageneration;

import com.coursework.bookstore_api.exceptions.BookNotFoundException;
import com.coursework.bookstore_api.exceptions.CustomerNotFoundException;
import com.coursework.bookstore_api.model.Book;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Order;
import com.coursework.bookstore_api.model.OrderItem;
import com.coursework.bookstore_api.repository.BookRepository;
import com.coursework.bookstore_api.repository.CustomerRepository;
import com.coursework.bookstore_api.repository.OrderRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class OrderGenerator {
    private static final Random random = new Random();
    
    // Maximum number of items per order
    private static final int MAX_ITEMS_PER_ORDER = 5;
    // Maximum quantity per item
    private static final int MAX_QUANTITY_PER_ITEM = 2;

    public static void generateOrders(
            int orderCount,
            OrderRepository orderRepository,
            BookRepository bookRepository,
            CustomerRepository customerRepository) {
        
        List<Integer> bookIds = bookRepository.findAll().stream().map(Book::getId).toList();
        List<Integer> customerIds = customerRepository.findAll().stream().map(Customer::getId).toList();
        
        for (int i = 0; i < orderCount; i++) {
            int customerId = customerIds.get(random.nextInt(customerIds.size()));
            
            // Create a new order
            Order order = new Order();
            order.setPaymentDate(new Date());
            order.setCustomer(customerRepository.findById(customerId)
                    .orElseThrow(() ->
                            new CustomerNotFoundException(">" + customerId + "< customer not found in the database.")));
            
            // Generate a random number of items for this order (1 to MAX_ITEMS_PER_ORDER)
            int itemCount = random.nextInt(MAX_ITEMS_PER_ORDER) + 1;
            List<OrderItem> orderItems = new ArrayList<>();
            double totalAmount = 0.0;
            
            // Create random order items
            for (int j = 0; j < itemCount; j++) {
                int bookId = bookIds.get(random.nextInt(bookIds.size()));
                Book book = bookRepository.findById(bookId)
                        .orElseThrow(() ->
                                new BookNotFoundException(">" + bookId + "< book not found in the database."));
                
                // Create an order item
                OrderItem orderItem = new OrderItem();
                orderItem.setBook(book);
                orderItem.setOrder(order);
                
                // Random quantity between 1 and MAX_QUANTITY_PER_ITEM
                int quantity = random.nextInt(MAX_QUANTITY_PER_ITEM) + 1;
                orderItem.setQuantity(quantity);
                orderItem.setPrice(book.getPrice());
                
                orderItems.add(orderItem);
                totalAmount += book.getPrice() * quantity;
            }
            
            // Set order items and total amount
            order.setOrderItems(orderItems);
            order.setAmount(totalAmount);
            
            // Save the order
            orderRepository.save(order);
        }
    }
}