package com.coursework.bookstore_api.dto;

import com.coursework.bookstore_api.model.Language;
import lombok.Data;

@Data
public class LanguageDto {
    private int id;
    private String language;

    public static LanguageDto from(Language language) {
        LanguageDto dto = new LanguageDto();
        dto.id = language.getId();
        dto.language = language.getLanguage();
        return dto;
    }

    public static Language toLanguage(LanguageDto dto) {
        Language language = new Language();
        language.setId(dto.id);
        language.setLanguage(dto.language);
        return language;
    }
}
