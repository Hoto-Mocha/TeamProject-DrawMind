package com.example.codemindprojbackend.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberType {
    ADMIN(1),
    USER(2);
    private final int code;
}
