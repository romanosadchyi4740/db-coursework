package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "book")
@Schema(name = "Book", description = "The book DB-entity")
public class Book {
    @Id
    @Column(name = "book_id")
    private int id;
    @Column(name = "title")
    private String title;
//    private Author author = null;
//    private String isbn = null;
//    private Publisher publisher = null;
}
