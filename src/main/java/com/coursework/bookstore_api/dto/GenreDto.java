package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Genre;
import lombok.Data;

@Data
public class GenreDto {
    private int id;
    private String genreName;

    public static GenreDto from(Genre genre) {
        GenreDto dto = new GenreDto();
        dto.id = genre.getId();
        dto.genreName = genre.getGenreName();
        return dto;
    }

    public static Genre toGenre(GenreDto dto) {
        Genre genre = new Genre();
        genre.setId(dto.id);
        genre.setGenreName(dto.genreName);
        return genre;
    }
}