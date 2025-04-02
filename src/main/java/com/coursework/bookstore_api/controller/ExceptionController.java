package com.coursework.bookstore_api.controller;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
@Slf4j
@Hidden
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception e) {
        log.error("General exception caught: {}", e.getMessage());
        return ResponseEntity.status(500).body(e.getMessage());
    }

}
