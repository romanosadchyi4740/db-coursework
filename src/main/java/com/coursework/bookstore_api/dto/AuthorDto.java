package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Author;
import lombok.Data;

@Data
public class AuthorDto {
    private int id;
    private String firstName;
    private String lastName;

    public static AuthorDto from(Author author) {
        AuthorDto dto = new AuthorDto();
        dto.id = author.getId();
        dto.firstName = author.getFirstName();
        dto.lastName = author.getLastName();
        return dto;
    }

    public static Author toAuthor(AuthorDto dto) {
        Author author = new Author();
        author.setId(dto.id);
        author.setFirstName(dto.firstName);
        author.setLastName(dto.lastName);
        return author;
    }
}