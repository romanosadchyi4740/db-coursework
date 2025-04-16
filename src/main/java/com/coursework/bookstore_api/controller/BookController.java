package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "BookController", description = "Provides all operations with books")
public class BookController {
    private final BookService bookService;

    @GetMapping("/books")
    @Operation(summary = "Finding all the books from the DB",
            description = "Gets all existing books from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                            @Content(mediaType = "application/json", schema =
                            @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<List<BookDto>> getBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @GetMapping("/books/{bookId}")
    @Operation(summary = "Finding a specific book from the DB",
            description = "Gets a specific book by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto.class))
            })
    })
    public ResponseEntity<BookDto> getBook(@PathVariable int bookId) {
        return ResponseEntity.ok(bookService.findById(bookId));
    }

}
