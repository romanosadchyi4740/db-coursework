//package com.coursework.bookstore_api.util;
//
//import ch.qos.logback.classic.spi.ILoggingEvent;
//import ch.qos.logback.core.AppenderBase;
//import com.coursework.bookstore_api.model.LogLevel;
//import com.coursework.bookstore_api.service.DatabaseLoggerService;
//import org.springframework.beans.BeansException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DatabaseServiceAppender extends AppenderBase<ILoggingEvent> implements ApplicationContextAware {
//
//    private ApplicationContext applicationContext;
//    private DatabaseLoggerService databaseLoggerService;
//
//    // Required no-argument constructor
//    public DatabaseServiceAppender() {
//    }
//
//    @Override
//    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//        this.applicationContext = applicationContext;
//    }
//
//    @Override
//    protected void append(ILoggingEvent eventObject) {
//        if (databaseLoggerService == null && applicationContext != null) {
//            try {
//                databaseLoggerService = applicationContext.getBean(DatabaseLoggerService.class);
//            } catch (BeansException e) {
//                addError("Error retrieving DatabaseLoggerService bean: " + e.getMessage(), e);
//                return; // Don't proceed if bean retrieval fails
//            }
//        }
//
//        if (databaseLoggerService != null) {
//            try {
//                databaseLoggerService.saveLog(
//                        LogLevel.valueOf(eventObject.getLevel().toString()),
//                        eventObject.getLoggerName(),
//                        eventObject.getFormattedMessage()
//                );
//            } catch (Exception e) {
//                addError("Failed to log to database", e);
//            }
//        } else {
//            addWarn("DatabaseLoggerService not yet initialized. Skipping log.");
//        }
//    }
//}