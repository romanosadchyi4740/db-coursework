package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.PublisherDto;
import com.coursework.bookstore_api.exceptions.PublisherNotFoundException;
import com.coursework.bookstore_api.model.Publisher;
import com.coursework.bookstore_api.repository.PublisherRepository;
import com.coursework.bookstore_api.service.PublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublisherServiceImpl implements PublisherService {
    private final PublisherRepository publisherRepository;

    @Override
    public List<PublisherDto> findAll() {
        return publisherRepository.findAll().stream().map(PublisherDto::from).collect(Collectors.toList());
    }

    @Override
    public PublisherDto findById(int id) {
        return PublisherDto.from(Objects.requireNonNull(publisherRepository
                .findById(id)
                .orElseThrow(() -> new PublisherNotFoundException("Publisher not found"))));
    }

    @Override
    public PublisherDto save(PublisherDto publisherDto) {
        Publisher publisher = PublisherDto.toPublisher(publisherDto);
        return PublisherDto.from(publisherRepository.save(publisher));
    }

    @Override
    public PublisherDto update(int id, PublisherDto publisherDto) {
        Publisher existingPublisher = publisherRepository.findById(id)
                .orElseThrow(() -> new PublisherNotFoundException("Publisher not found"));

        existingPublisher.setPublisherName(publisherDto.getPublisherName());

        return PublisherDto.from(publisherRepository.save(existingPublisher));
    }

    @Override
    public void deleteById(int id) {
        publisherRepository.deleteById(id);
    }
}
