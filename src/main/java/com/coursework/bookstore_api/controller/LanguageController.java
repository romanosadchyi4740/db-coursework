package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.LanguageDto;
import com.coursework.bookstore_api.service.LanguageService;
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
@Tag(name = "LanguageController", description = "Provides all operations with languages")
public class LanguageController {
    private static final Logger logger = LoggerFactory.getLogger(LanguageController.class);

    private final LanguageService languageService;

    @GetMapping("/languages")
    @Operation(summary = "Finding all the languages from the DB",
            description = "Gets all existing languages from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = LanguageDto[].class))
            })
    })
    public ResponseEntity<List<LanguageDto>> getLanguages() {
        logger.info("Getting all languages from the DB");
        return ResponseEntity.ok(languageService.findAll());
    }

    @GetMapping("/languages/{languageId}")
    @Operation(summary = "Finding a specific language from the DB",
            description = "Gets a specific language by id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = LanguageDto.class))
            })
    })
    public ResponseEntity<LanguageDto> getLanguage(@PathVariable int languageId) {
        logger.info("Getting a language from the DB by id: {}", languageId);
        return ResponseEntity.ok(languageService.findById(languageId));
    }

    @PostMapping("/languages")
    @Operation(summary = "Creating a new language",
            description = "Creates a new language in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = LanguageDto.class))
            })
    })
    public ResponseEntity<LanguageDto> createLanguage(@RequestBody LanguageDto languageDto) {
        logger.info("Creating a new language in the DB: {}", languageDto);
        return new ResponseEntity<>(languageService.save(languageDto), HttpStatus.CREATED);
    }

    @PutMapping("/languages/{languageId}")
    @Operation(summary = "Updating an existing language",
            description = "Updates an existing language in the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema =
                    @Schema(implementation = LanguageDto.class))
            })
    })
    public ResponseEntity<LanguageDto> updateLanguage(@PathVariable int languageId, @RequestBody LanguageDto languageDto) {
        logger.info("Updating an existing language in the DB with id: {}, data: {}", languageId, languageDto);
        return ResponseEntity.ok(languageService.update(languageId, languageDto));
    }

    @DeleteMapping("/languages/{languageId}")
    @Operation(summary = "Deleting a language",
            description = "Deletes a language from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    public ResponseEntity<Void> deleteLanguage(@PathVariable int languageId) {
        logger.info("Deleting a language from the DB by id: {}", languageId);
        languageService.deleteById(languageId);
        return ResponseEntity.noContent().build();
    }
}
