package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.CustomerDto;
import com.coursework.bookstore_api.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "CustomerController", description = "Provides all operations with customers")
public class CustomerController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    private final CustomerService customerService;

    @GetMapping("/customers")
    @Operation(summary = "Finding all the customers from the DB",
            description = "Gets all existing customers from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CustomerDto[].class))
            })
    })
    public ResponseEntity<List<CustomerDto>> getCustomers() {
        logger.info("Getting all customers from the DB");
        return ResponseEntity.ok(customerService.findAll());
    }

    @GetMapping("/customers/{customerId}")
    @Operation(summary = "Finding a specific customer from the DB",
            description = "Gets a specific customer by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CustomerDto.class))
            })
    })
    public ResponseEntity<CustomerDto> getCustomer(@PathVariable int customerId) {
        logger.info("Getting a customer from the DB by id: {}", customerId);
        return ResponseEntity.ok(customerService.findById(customerId));
    }

    @PostMapping("/customers")
    @Operation(summary = "Creating a new customer",
            description = "Creates a new customer in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CustomerDto.class))
            })
    })
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto) {
        logger.info("Creating a new customer in the DB: {}", customerDto);
        return new ResponseEntity<>(customerService.save(customerDto), HttpStatus.CREATED);
    }

    @PutMapping("/customers/{customerId}")
    @Operation(summary = "Updating an existing customer",
            description = "Updates an existing customer in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = CustomerDto.class))
            })
    })
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable int customerId, @RequestBody CustomerDto customerDto) {
        logger.info("Updating an existing customer in the DB with id: {}, data: {}", customerId, customerDto);
        return ResponseEntity.ok(customerService.update(customerId, customerDto));
    }

    @DeleteMapping("/customers/{customerId}")
    @Operation(summary = "Deleting a customer",
            description = "Deletes a customer from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteCustomer(@PathVariable int customerId) {
        logger.info("Deleting a customer from the DB by id: {}", customerId);
        customerService.deleteById(customerId);
        return ResponseEntity.noContent().build();
    }
}
