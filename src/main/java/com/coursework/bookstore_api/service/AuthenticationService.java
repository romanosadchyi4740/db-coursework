package com.coursework.bookstore_api.service;

import com.coursework.bookstore_api.dto.request.SignInRequest;
import com.coursework.bookstore_api.dto.request.SignUpRequest;
import com.coursework.bookstore_api.dto.response.JwtAuthenticationResponse;
import com.coursework.bookstore_api.model.Customer;
import com.coursework.bookstore_api.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signUp(SignUpRequest signUpRequest) {
        Customer user = Customer.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userService.create(user);

        String jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

    public JwtAuthenticationResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getUsername(),
                signInRequest.getPassword()
                )
        );

        Customer user = (Customer) userService.userDetailsService().loadUserByUsername(signInRequest.getUsername());
        String jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(jwt);
    }
}