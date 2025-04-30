package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.exceptions.*;
import com.coursework.bookstore_api.model.LogLevel;
import com.coursework.bookstore_api.service.DatabaseLoggerService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
@Slf4j
@Hidden
@RequiredArgsConstructor
public class ExceptionController {

    private final DatabaseLoggerService databaseLoggerService;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception e) {
        log.error("General exception caught: {}", e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), "General exception caught: " + e.getMessage());
        return ResponseEntity.status(500).body(e.getMessage());
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<String> bookNotFoundException(BookNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity<String> authorNotFoundException(AuthorNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<String> customerNotFoundException(CustomerNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(GenreNotFoundException.class)
    public ResponseEntity<String> genreNotFoundException(GenreNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(LanguageNotFoundException.class)
    public ResponseEntity<String> languageNotFoundException(LanguageNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<String> orderNotFoundException(OrderNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(PublisherNotFoundException.class)
    public ResponseEntity<String> publisherNotFoundException(PublisherNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<String> reviewNotFoundException(ReviewNotFoundException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(OutOfStockException.class)
    public ResponseEntity<String> outOfStockException(OutOfStockException e) {
        log.error(e.getMessage());
        databaseLoggerService.saveLog(LogLevel.ERROR, log.getName(), e.getMessage());
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
