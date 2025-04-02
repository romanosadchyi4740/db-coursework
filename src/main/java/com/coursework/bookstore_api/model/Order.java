package com.coursework.bookstore_api.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "Order", description = "The order DB-entity")
public class Order {
    private int id;
    private Date date;
}
