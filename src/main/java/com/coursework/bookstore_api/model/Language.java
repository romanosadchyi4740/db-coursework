package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Language", description = "The language DB-entity")
public class Language {
    private int id;
    private String languageName;
}
