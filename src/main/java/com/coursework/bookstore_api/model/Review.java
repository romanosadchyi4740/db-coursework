package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Review", description = "The review DB-entity")
public class Review {
    private int id;
    private String text;
    private UserDetails reviewer;
}
