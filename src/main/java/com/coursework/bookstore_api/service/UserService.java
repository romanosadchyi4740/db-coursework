package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.exceptions.EmailAlreadyInUseException;
import com.coursework.bookstore_api.exceptions.UsernameAlreadyInUseException;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Role;
import com.coursework.bookstore_api.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomerRepository repository;

    public Customer save(Customer user) {
        return repository.save(user);
    }

    public Customer create(Customer user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyInUseException("User with this username already exists: " + user.getUsername());
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyInUseException("User with this email already exists: " + user.getEmail());
        }

        return save(user);
    }

    public Customer getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public Customer getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }

    @Deprecated
    public void getAdmin() {
        Customer user = getCurrentUser();
        user.setRole(Role.ROLE_ADMIN);
        save(user);
    }
}