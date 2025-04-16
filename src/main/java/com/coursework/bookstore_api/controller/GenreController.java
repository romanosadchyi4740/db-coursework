package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.GenreDto;
import com.coursework.bookstore_api.service.GenreService;
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
@Tag(name = "GenreController", description = "Provides all operations with genres")
public class GenreController {
    private final GenreService genreService;

    @GetMapping("/genres")
    @Operation(summary = "Finding all the genres from the DB",
            description = "Gets all existing genres from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = GenreDto[].class))
            })
    })
    public ResponseEntity<List<GenreDto>> getGenres() {
        return ResponseEntity.ok(genreService.findAll());
    }

    @GetMapping("/genres/{genreId}")
    @Operation(summary = "Finding a specific genre from the DB",
            description = "Gets a specific genre by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = GenreDto.class))
            })
    })
    public ResponseEntity<GenreDto> getGenre(@PathVariable int genreId) {
        return ResponseEntity.ok(genreService.findById(genreId));
    }

    @PostMapping("/genres")
    @Operation(summary = "Creating a new genre",
            description = "Creates a new genre in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = GenreDto.class))
            })
    })
    public ResponseEntity<GenreDto> createGenre(@RequestBody GenreDto genreDto) {
        return new ResponseEntity<>(genreService.save(genreDto), HttpStatus.CREATED);
    }

    @PutMapping("/genres/{genreId}")
    @Operation(summary = "Updating an existing genre",
            description = "Updates an existing genre in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = GenreDto.class))
            })
    })
    public ResponseEntity<GenreDto> updateGenre(@PathVariable int genreId, @RequestBody GenreDto genreDto) {
        return ResponseEntity.ok(genreService.update(genreId, genreDto));
    }

    @DeleteMapping("/genres/{genreId}")
    @Operation(summary = "Deleting a genre",
            description = "Deletes a genre from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteGenre(@PathVariable int genreId) {
        genreService.deleteById(genreId);
        return ResponseEntity.noContent().build();
    }
}