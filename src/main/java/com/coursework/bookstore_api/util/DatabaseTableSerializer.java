package com.coursework.bookstore_api.util;

import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.IOException;
import java.nio.file.Path;
import java.sql.*;

@Component
public class DatabaseTableSerializer {
    private final DataSource dataSource;

    public DatabaseTableSerializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Path writeDbTableToCsvFile(String tableName) throws SQLException {
        Connection connection = dataSource.getConnection();
        String query = "SELECT * FROM " + tableName + ";";
        try (PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            ResultSet rs = statement.executeQuery();
            Path tempFile = CsvFileWriter.writeTableContentsToCsvFile(tableName, rs);
            connection.close();
            return tempFile;
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
