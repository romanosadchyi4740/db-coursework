package com.coursework.bookstore_api.service.impl;

import com.coursework.bookstore_api.dto.LanguageDto;
import com.coursework.bookstore_api.exceptions.LanguageNotFoundException;
import com.coursework.bookstore_api.model.Language;
import com.coursework.bookstore_api.repository.LanguageRepository;
import com.coursework.bookstore_api.service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService {
    private final LanguageRepository languageRepository;

    @Override
    public List<LanguageDto> findAll() {
        return languageRepository.findAll().stream().map(LanguageDto::from).collect(Collectors.toList());
    }

    @Override
    public LanguageDto findById(int id) {
        return LanguageDto.from(Objects.requireNonNull(languageRepository
                .findById(id)
                .orElseThrow(() -> new LanguageNotFoundException("Language not found"))));
    }

    @Override
    public LanguageDto save(LanguageDto languageDto) {
        Language language = LanguageDto.toLanguage(languageDto);
        return LanguageDto.from(languageRepository.save(language));
    }

    @Override
    public LanguageDto update(int id, LanguageDto languageDto) {
        Language existingLanguage = languageRepository.findById(id)
                .orElseThrow(() -> new LanguageNotFoundException("Language not found"));

        existingLanguage.setLanguage(languageDto.getLanguage());

        return LanguageDto.from(languageRepository.save(existingLanguage));
    }

    @Override
    public void deleteById(int id) {
        languageRepository.deleteById(id);
    }
}
