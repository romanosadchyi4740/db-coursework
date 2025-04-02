package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Genre", description = "The Genre DB-entity")
public class Genre {
    private int id;
    private String genreName;
}
