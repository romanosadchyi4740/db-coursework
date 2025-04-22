package com.coursework.bookstore_api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Registration request")
public class SignUpRequest {

    @Schema(description = "Username", example = "Jon")
    @Size(min = 5, max = 50, message = "Username length has to be between 5 and 50 symbols")
    @NotBlank(message = "Username can't be blank")
    private String username;

    @Schema(description = "Email address", example = "jondoe@gmail.com")
    @Size(min = 5, max = 255, message = "Email length has to be between 5 and 255 symbols")
    @NotBlank(message = "Email can't be blank")
    @Email(message = "Email has to be formatted like: user@example.com")
    private String email;

    @Schema(description = "Password", example = "my_1secret1_password")
    @Size(min = 8, max = 255, message = "Password length has to be between 8 and 255 symbols")
    @NotBlank(message = "Password can't be blank")
    private String password;
}