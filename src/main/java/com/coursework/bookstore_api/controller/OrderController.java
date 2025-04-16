package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.OrderDto;
import com.coursework.bookstore_api.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "Provides all operations with orders")
public class OrderController {
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
        return ResponseEntity.ok(orderService.findAll());
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
        return ResponseEntity.ok(orderService.update(orderId, orderDto));
    }

    @DeleteMapping("/orders/{orderId}")
    @Operation(summary = "Deleting an order",
            description = "Deletes an order from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderId) {
        orderService.deleteById(orderId);
        return ResponseEntity.noContent().build();
    }
}