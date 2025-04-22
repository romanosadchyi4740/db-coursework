package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Author;
import lombok.Data;

@Data
public class AuthorDto {
    private int id;
    private String name;

    public static AuthorDto from(Author author) {
        AuthorDto dto = new AuthorDto();
        dto.id = author.getId();
        dto.name = author.getName();
        return dto;
    }

    public static Author toAuthor(AuthorDto dto) {
        Author author = new Author();
        author.setId(dto.id);
        author.setName(dto.name);
        return author;
    }
}