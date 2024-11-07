package com.example.codemindprojbackend.api.request;

import lombok.*;

public class MemoRequest {
    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Create {
        private String userEmail;
        private String title;
        private String content;
        private MemoType memoType;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Update {
        private String userEmail;
        private String title;
        private String content;
        private MemoType memoType;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Delete {
        private String userEmail;
    }
}
