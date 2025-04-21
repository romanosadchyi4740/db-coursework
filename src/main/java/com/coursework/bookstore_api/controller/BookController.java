package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.service.AuthorService;
import com.coursework.bookstore_api.service.BookService;
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
@Tag(name = "BookController", description = "Provides all operations with books")
public class BookController {
    private final BookService bookService;
    private final AuthorService authorService;

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

    @PostMapping("/books")
    @Operation(summary = "Creating a new book",
            description = "Creates a new book in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto.class))
            })
    })
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto) {
        return new ResponseEntity<>(bookService.save(bookDto), HttpStatus.CREATED);
    }

    @PutMapping("/books/{bookId}")
    @Operation(summary = "Updating an existing book",
            description = "Updates an existing book in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto.class))
            })
    })
    public ResponseEntity<BookDto> updateBook(@PathVariable int bookId, @RequestBody BookDto bookDto) {
        return ResponseEntity.ok(bookService.update(bookId, bookDto));
    }

    @DeleteMapping("/books/{bookId}")
    @Operation(summary = "Deleting a book",
            description = "Deletes a book from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteBook(@PathVariable int bookId) {
        bookService.deleteById(bookId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/books/author/{authorId}")
    @Operation(summary = "Finding all books by author id",
            description = "Gets all books by author id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<List<BookDto>> getBooksByAuthorId(@PathVariable int authorId) {
        return ResponseEntity.ok(authorService.getAllBooksForAuthor(authorId));
    }
}
