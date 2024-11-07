package com.example.codemindprojbackend.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemoType {
    PLAINTEXT(1),
    BASH(2),
    CPP(3),
    JAVA(4),
    JAVASCRIPT(5),
    CSS(6),
    HTML(7),
    PYTHON(8);

    private final int value;
}
