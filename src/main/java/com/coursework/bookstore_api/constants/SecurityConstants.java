package com.coursework.bookstore_api.constants;

import lombok.experimental.UtilityClass;

@UtilityClass
public class SecurityConstants {
    public static final long JWT_EXPIRATION = 70000;
    public static final String JWT_SECRET = "secret";
}
