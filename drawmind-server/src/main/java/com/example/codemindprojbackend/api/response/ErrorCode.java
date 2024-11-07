package com.example.codemindprojbackend.api.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    BAD_REQUEST(400),
    NOT_FOUND(404);
    private final int code;
    private String message;
}
