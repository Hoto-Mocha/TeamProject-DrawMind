package com.example.codemindprojbackend.api.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    BAD_REQUEST(400),
    NOT_FOUND(2003),
    NO_PARAMETER(1001);
    private final int code;
    private String message;
}
