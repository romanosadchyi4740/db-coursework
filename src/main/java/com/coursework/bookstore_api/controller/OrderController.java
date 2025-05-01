package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.OrderDto;
import com.coursework.bookstore_api.service.OrderService;
import com.coursework.bookstore_api.util.OrdersSerializer;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "Provides all operations with orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;

    @GetMapping("/orders")
    @Operation(summary = "Finding all the orders from the DB",
            description = "Gets all existing orders from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto[].class))
            })
    })
    public ResponseEntity<List<OrderDto>> getOrders() {
        logger.info("Getting all orders from the DB");
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/orders-history")
    @Operation(summary = "Finding all the orders for the current user",
            description = "Gets all existing orders for the current user from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto[].class))
            })
    })
    public ResponseEntity<List<OrderDto>> getOrdersByCustomerId(@RequestParam int customerId) {
        logger.info("Getting all orders for customer with id: {}", customerId);
        return ResponseEntity.ok(orderService.findAllByCustomerId(customerId));
    }

    @GetMapping("/orders/{orderId}")
    @Operation(summary = "Finding a specific order from the DB",
            description = "Gets a specific order by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto.class))
            })
    })
    public ResponseEntity<OrderDto> getOrder(@PathVariable int orderId) {
        logger.info("Getting an order from the DB by id: {}", orderId);
        return ResponseEntity.ok(orderService.findById(orderId));
    }

    @PostMapping("/orders")
    @Operation(summary = "Creating a new order",
            description = "Creates a new order in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto.class))
            })
    })
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        logger.info("Creating a new order in the DB: {}", orderDto);
        return new ResponseEntity<>(orderService.save(orderDto), HttpStatus.CREATED);
    }

    @PutMapping("/orders/{orderId}")
    @Operation(summary = "Updating an existing order",
            description = "Updates an existing order in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto.class))
            })
    })
    public ResponseEntity<OrderDto> updateOrder(@PathVariable int orderId, @RequestBody OrderDto orderDto) {
        logger.info("Updating an existing order in the DB with id: {}, data: {}", orderId, orderDto);
        return ResponseEntity.ok(orderService.update(orderId, orderDto));
    }

    @DeleteMapping("/orders/{orderId}")
    @Operation(summary = "Deleting an order",
            description = "Deletes an order from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderId) {
        logger.info("Deleting an order from the DB by id: {}", orderId);
        orderService.deleteById(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orders/download")
    @Operation(summary = "Downloading all the orders from the DB",
            description = "Downloads all existing orders from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = OrderDto[].class))
            })
    })
    public ResponseEntity<Resource> downloadOrders() throws IOException {
        logger.info("Downloading all orders from the DB");
        Path path = OrdersSerializer.downloadJsonFile(orderService.findAll());
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=payment.csv");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(resource.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }
}
