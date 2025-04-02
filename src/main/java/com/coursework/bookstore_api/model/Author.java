package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Author", description = "The author DB-entity")
public class Author {
    private int id;
    private String firstName;
    private String lastName;
    private String pseudonym = "";
}
