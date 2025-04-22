package com.coursework.bookstore_api.util;

import lombok.experimental.UtilityClass;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

@UtilityClass
public class CsvFileWriter {
    public static Path writeTableContentsToCsvFile(final String tableName, final ResultSet rs) throws IOException, SQLException {
        Path tempFile = Files.createTempFile(tableName, ".csv");
        try (BufferedWriter writer = Files.newBufferedWriter(tempFile)) {
            ResultSetMetaData meta = rs.getMetaData();
            for (int i = 1; i <= meta.getColumnCount(); i++) {
                if (i > 1) writer.write(",");
                writer.write(meta.getColumnName(i));
            }
            writer.newLine();

            while (rs.next()) {
                for (int i = 1; i <= meta.getColumnCount(); i++) {
                    if (i > 1) {
                        writer.write(",");
                    }
                    String value = rs.getString(i);
                    writer.write(escapeCsvValue(value));
                }
                writer.newLine();
            }
        }
        return tempFile;
    }

    private static String escapeCsvValue(final String value) {
        if (value == null) {
            return "null";
        }

        boolean needsQuotes = value.contains(",") ||
                value.contains("\n") ||
                value.contains("\"");

        if (needsQuotes) {
            return "\"" + value.replace("\"", "").replace("\n", " ") + "\"";
        }
        return value;
    }
}