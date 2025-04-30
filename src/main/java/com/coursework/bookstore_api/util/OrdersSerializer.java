package com.coursework.bookstore_api.util;

import com.coursework.bookstore_api.dto.OrderDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@UtilityClass
public class OrdersSerializer {
    public static Path downloadJsonFile(List<OrderDto> orders) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Path tempFile = Files.createTempFile("orders-", ".json");
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(tempFile.toFile(), orders);
            return tempFile;
        } catch (IOException e) {
            throw new RuntimeException("Failed to create or write to the JSON file", e);
        }
    }
}
