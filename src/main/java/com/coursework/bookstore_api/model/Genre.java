package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "genre")
@Schema(name = "Genre", description = "The Genre DB-entity")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int id;

    @Column(name = "genre_name")
    private String genreName;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "book_genre", joinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "genre_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "book_id"))
    private List<Book> books = new ArrayList<>();
}
