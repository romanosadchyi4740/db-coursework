package com.coursework.bookstore_api.exceptions;

public class LanguageNotFoundException extends RuntimeException {
    public LanguageNotFoundException(String message) {
        super(message);
    }
}