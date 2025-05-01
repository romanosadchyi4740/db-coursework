package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.BookDto;
import com.coursework.bookstore_api.dto.request.BookRequest;
import com.coursework.bookstore_api.dto.response.BooksResponse;
import com.coursework.bookstore_api.service.BookService;
import com.coursework.bookstore_api.util.DatabaseTableSerializer;
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
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "BookController", description = "Provides all operations with books")
public class BookController {
    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    private final BookService bookService;
    private final DatabaseTableSerializer serializer;

    @GetMapping("/books/all")
    @Operation(summary = "Finding all the books from the DB",
            description = "Gets all existing books from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<List<BookDto>> getBooks() {
        logger.info("Getting all books from the DB");
        return ResponseEntity.ok(bookService.findAll());
    }

    @GetMapping("/books")
    @Operation(summary = "Finding batch of books from the DB",
            description = "Gets a batch of books from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BooksResponse.class))
            })
    })
    public ResponseEntity<BooksResponse> getBooks(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting a batch of books from the DB");
        return ResponseEntity.ok(bookService.findAll(pageNo, pageSize));
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
        logger.info("Getting a book from the DB by id: {}", bookId);
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
    public ResponseEntity<BookDto> createBook(@RequestBody BookRequest bookDto) {
        logger.info("Creating a new book in the DB: {}", bookDto);
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
    public ResponseEntity<BookDto> updateBook(@PathVariable int bookId, @RequestBody BookRequest bookDto) {
        logger.info("Updating an existing book in the DB: {}", bookDto);
        return ResponseEntity.ok(bookService.update(bookId, bookDto));
    }

    @DeleteMapping("/books/{bookId}")
    @Operation(summary = "Deleting a book",
            description = "Deletes a book from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteBook(@PathVariable int bookId) {
        logger.info("Deleting a book from the DB by id: {}", bookId);
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
    public ResponseEntity<BooksResponse> getBooksByAuthorId(
            @PathVariable int authorId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting all books by author id from the DB: {}", authorId);
        return ResponseEntity.ok(bookService.findAllByAuthorId(authorId, pageNo, pageSize));
    }

    @GetMapping("/books/genre/{genreId}")
    @Operation(summary = "Finding all books by genre id",
            description = "Gets all books by author id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<BooksResponse> getBooksByGenreId(
            @PathVariable int genreId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting all books by genre id from the DB: {}", genreId);
        return ResponseEntity.ok(bookService.findAllByGenreId(genreId, pageNo, pageSize));
    }

    @GetMapping("/books/publisher/{publisherId}")
    @Operation(summary = "Finding all books by publisher id",
            description = "Gets all books by author id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<BooksResponse> getBooksByPublisherId(
            @PathVariable int publisherId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting all books by publisher id from the DB: {}", publisherId);
        return ResponseEntity.ok(bookService.findAllByPublisherId(publisherId, pageNo, pageSize));
    }

    @GetMapping("/books/title/{title}")
    @Operation(summary = "Finding all books by title fragment",
            description = "Gets all books by title fragment from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<BooksResponse> getBooksByTitle(
            @PathVariable String title,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting all books by title fragment from the DB: {}", title);
        return ResponseEntity.ok(bookService.findAllByTitle(title, pageNo, pageSize));
    }

    @GetMapping("/books/filter")
    @Operation(summary = "Finding books with multiple filters",
            description = "Gets books filtered by title, publisher, author, and/or genre")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BooksResponse.class))
            })
    })
    public ResponseEntity<BooksResponse> getFilteredBooks(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "publisherId", required = false) Integer publisherId,
            @RequestParam(value = "authorId", required = false) Integer authorId,
            @RequestParam(value = "genreId", required = false) Integer genreId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        logger.info("Getting filtered books with title: {}, publisherId: {}, authorId: {}, genreId: {}", 
                title, publisherId, authorId, genreId);
        return ResponseEntity.ok(bookService.getFilteredBooks(title, publisherId, authorId, genreId, pageNo, pageSize));
    }

    @GetMapping("/books/download")
    @Operation(summary = "Downloading all books",
            description = "Downloads all books from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = BookDto[].class))
            })
    })
    public ResponseEntity<Resource> downloadBooks() throws IOException, SQLException {
        logger.info("Downloading all books from the DB");
        Path path = serializer.writeDbTableToCsvFile("book");
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=book.csv");
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
