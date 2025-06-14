package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.AuthorDto;
import com.coursework.bookstore_api.dto.response.AuthorsResponse;
import com.coursework.bookstore_api.service.AuthorService;
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
@Tag(name = "AuthorController", description = "Provides all operations with authors")
public class AuthorController {
    private static final Logger logger = LoggerFactory.getLogger(AuthorController.class);

    private final AuthorService authorService;

    @GetMapping("/authors/all")
    @Operation(summary = "Finding all the authors from the DB",
            description = "Gets all existing authors from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AuthorDto[].class))
            })
    })
    public ResponseEntity<List<AuthorDto>> getAuthors() {
        logger.info("Getting all authors from the DB");
        return ResponseEntity.ok(authorService.findAll());
    }

    @GetMapping("/authors")
    @Operation(summary = "Finding a batch of authors from the DB",
            description = "Gets a batch of authors from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AuthorsResponse.class))
            })
    })
    public ResponseEntity<AuthorsResponse> getAuthors(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize
    ) {
        logger.info("Getting a batch of authors from the DB with pageNo: {} and pageSize: {}", pageNo, pageSize);
        return ResponseEntity.ok(authorService.findAll(pageNo, pageSize));
    }

    @GetMapping("/authors/{authorId}")
    @Operation(summary = "Finding a specific author from the DB",
            description = "Gets a specific author by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AuthorDto.class))
            })
    })
    public ResponseEntity<AuthorDto> getAuthor(@PathVariable int authorId) {
        logger.info("Getting an author from the DB by id: {}", authorId);
        return ResponseEntity.ok(authorService.findById(authorId));
    }

    @PostMapping("/authors")
    @Operation(summary = "Creating a new author",
            description = "Creates a new author in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AuthorDto.class))
            })
    })
    public ResponseEntity<AuthorDto> createAuthor(@RequestBody AuthorDto authorDto) {
        logger.info("Creating a new author in the DB: {}", authorDto);
        return new ResponseEntity<>(authorService.save(authorDto), HttpStatus.CREATED);
    }

    @PutMapping("/authors/{authorId}")
    @Operation(summary = "Updating an existing author",
            description = "Updates an existing author in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = AuthorDto.class))
            })
    })
    public ResponseEntity<AuthorDto> updateAuthor(@PathVariable int authorId, @RequestBody AuthorDto authorDto) {
        logger.info("Updating an existing author in the DB with id: {}, data: {}", authorId, authorDto);
        return ResponseEntity.ok(authorService.update(authorId, authorDto));
    }

    @DeleteMapping("/authors/{authorId}")
    @Operation(summary = "Deleting an author",
            description = "Deletes an author from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteAuthor(@PathVariable int authorId) {
        logger.info("Deleting an author from the DB by id: {}", authorId);
        authorService.deleteById(authorId);
        return ResponseEntity.noContent().build();
    }
}
