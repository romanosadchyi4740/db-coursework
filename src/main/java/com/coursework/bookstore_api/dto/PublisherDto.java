package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Publisher;
import lombok.Data;

@Data
public class PublisherDto {
    private int id;
    private String publisherName;

    public static PublisherDto from(Publisher publisher) {
        PublisherDto dto = new PublisherDto();
        dto.id = publisher.getId();
        dto.publisherName = publisher.getPublisherName();
        return dto;
    }

    public static Publisher toPublisher(PublisherDto dto) {
        Publisher publisher = new Publisher();
        publisher.setId(dto.id);
        publisher.setPublisherName(dto.publisherName);
        return publisher;
    }
}