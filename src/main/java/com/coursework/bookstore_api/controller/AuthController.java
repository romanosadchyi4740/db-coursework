package com.coursework.bookstore_api.controller;

import com.coursework.bookstore_api.dto.request.SignInRequest;
import com.coursework.bookstore_api.dto.request.SignUpRequest;
import com.coursework.bookstore_api.dto.response.JwtAuthenticationResponse;
import com.coursework.bookstore_api.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "AuthController", description = "Provides all operations with authentication")
public class AuthController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "User registration")
    @PostMapping("/sign-up")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpRequest request) {
        return authenticationService.signUp(request);
    }

    @Operation(summary = "User authorization")
    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request) {
        return authenticationService.signIn(request);
    }
}
