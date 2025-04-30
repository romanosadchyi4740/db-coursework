package com.coursework.bookstore_api.repository;

import com.coursework.bookstore_api.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findAllByPublisherId(int publisherId, Pageable pageable);

    Page<Book> findByAuthors_Id(int authorId, Pageable pageable);

    Page<Book> findByGenres_Id(int genresId, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    List<Book> findByTitleContainingIgnoreCase(String title);

    Page<Book> findAllByIdIn(List<Integer> ids, Pageable pageable);
}
