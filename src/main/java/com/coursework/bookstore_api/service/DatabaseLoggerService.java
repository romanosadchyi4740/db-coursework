package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.model.Log;
import com.coursework.bookstore_api.model.LogLevel;
import com.coursework.bookstore_api.repository.LogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class DatabaseLoggerService {

    private final LogRepository logRepository;

    public DatabaseLoggerService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void saveLog(LogLevel level, String logger, String message) {
        Log logEntity = new Log();
        logEntity.setTimestamp(LocalDateTime.now());
        logEntity.setLevel(level);
        logEntity.setLoggerName(logger);
        logEntity.setMessage(message);

        logRepository.save(logEntity);
    }
}

