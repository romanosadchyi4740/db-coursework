package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.GenreDto;
import com.coursework.bookstore_api.exceptions.GenreNotFoundException;
import com.coursework.bookstore_api.model.Genre;
import com.coursework.bookstore_api.repository.GenreRepository;
import com.coursework.bookstore_api.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    @Override
    public List<GenreDto> findAll() {
        return genreRepository.findAll().stream().map(GenreDto::from).collect(Collectors.toList());
    }

    @Override
    public GenreDto findById(int id) {
        return GenreDto.from(Objects.requireNonNull(genreRepository
                .findById(id)
                .orElseThrow(() -> new GenreNotFoundException("Genre not found"))));
    }

    @Override
    public GenreDto save(GenreDto genreDto) {
        Genre genre = GenreDto.toGenre(genreDto);
        return GenreDto.from(genreRepository.save(genre));
    }

    @Override
    public GenreDto update(int id, GenreDto genreDto) {
        Genre existingGenre = genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException("Genre not found"));

        existingGenre.setGenreName(genreDto.getGenreName());

        return GenreDto.from(genreRepository.save(existingGenre));
    }

    @Override
    public void deleteById(int id) {
        genreRepository.deleteById(id);
    }
}
