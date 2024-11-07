package com.example.codemindprojbackend.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LogType {
    LOGIN(1),
    LOGOUT(2),
    WRITE(3),
    MEMBER_DELETE(4),
    MEMBER_MODIFY(5),
    POST_MODIFY(6),
    POST_DELETE(7),
    COMMENT_WRITE(8),
    COMMENT_MODIFY(9);
    private final int code;
}
