package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.PublisherDto;
import com.coursework.bookstore_api.service.PublisherService;
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
@Tag(name = "PublisherController", description = "Provides all operations with publishers")
public class PublisherController {
    private static final Logger logger = LoggerFactory.getLogger(PublisherController.class);

    private final PublisherService publisherService;

    @GetMapping("/publishers")
    @Operation(summary = "Finding all the publishers from the DB",
            description = "Gets all existing publishers from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = PublisherDto[].class))
            })
    })
    public ResponseEntity<List<PublisherDto>> getPublishers() {
        logger.info("Getting all publishers from the DB");
        return ResponseEntity.ok(publisherService.findAll());
    }

    @GetMapping("/publishers/{publisherId}")
    @Operation(summary = "Finding a specific publisher from the DB",
            description = "Gets a specific publisher by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = PublisherDto.class))
            })
    })
    public ResponseEntity<PublisherDto> getPublisher(@PathVariable int publisherId) {
        logger.info("Getting a publisher from the DB by id: {}", publisherId);
        return ResponseEntity.ok(publisherService.findById(publisherId));
    }

    @PostMapping("/publishers")
    @Operation(summary = "Creating a new publisher",
            description = "Creates a new publisher in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = PublisherDto.class))
            })
    })
    public ResponseEntity<PublisherDto> createPublisher(@RequestBody PublisherDto publisherDto) {
        logger.info("Creating a new publisher in the DB: {}", publisherDto);
        return new ResponseEntity<>(publisherService.save(publisherDto), HttpStatus.CREATED);
    }

    @PutMapping("/publishers/{publisherId}")
    @Operation(summary = "Updating an existing publisher",
            description = "Updates an existing publisher in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = PublisherDto.class))
            })
    })
    public ResponseEntity<PublisherDto> updatePublisher(@PathVariable int publisherId, @RequestBody PublisherDto publisherDto) {
        logger.info("Updating an existing publisher in the DB with id: {}, data: {}", publisherId, publisherDto);
        return ResponseEntity.ok(publisherService.update(publisherId, publisherDto));
    }

    @DeleteMapping("/publishers/{publisherId}")
    @Operation(summary = "Deleting a publisher",
            description = "Deletes a publisher from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deletePublisher(@PathVariable int publisherId) {
        logger.info("Deleting a publisher from the DB by id: {}", publisherId);
        publisherService.deleteById(publisherId);
        return ResponseEntity.noContent().build();
    }
}
