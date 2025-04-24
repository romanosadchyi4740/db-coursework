package com.coursework.bookstore_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookRequest {
    private String title;
    private List<Integer> authorIds;
    private List<Integer> genreIds;
    private int languageId;
    private String publisherId;
    private double price;
    private int numberInStock;
}
