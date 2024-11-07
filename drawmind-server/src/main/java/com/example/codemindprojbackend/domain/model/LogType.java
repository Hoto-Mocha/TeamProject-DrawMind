package com.example.codemindprojbackend.domain.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LogType {
    LOGIN(1),
    LOGOUT(2),
    MEMBER_MODIFY(3),
    MEMBER_DELETE(4),
    MEMO_MODIFY(5),
    MEMO_DELETE(6);
    private final int code;
}
