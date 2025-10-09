package com.bsn.beta.handler;

import lombok.*;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum BusinessErrorCodes {
    NO_CODE(0,NOT_IMPLEMENTED,"No code"),
    INCORRECT_PASSWORD(300,BAD_REQUEST,"Incorrect password"),
    NEW_PASSWORD_DOES_NOT_MATCH(301,BAD_REQUEST,"New password doesn't match"),
    ACCOUNT_LOCKED(302,FORBIDDEN,"User account is locked"),
    ACCOUNT_DISABLED(303,FORBIDDEN,"User account is disabled"),
    BAD_CREDENTIALS(304,FORBIDDEN,"Login and/or password is incorrect")
    ;

    @Getter
    private int code;
    @Getter
    private String description;
    @Getter
    private HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }

}
