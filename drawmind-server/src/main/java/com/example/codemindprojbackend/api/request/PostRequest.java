package com.example.codemindprojbackend.api.request;

import lombok.*;

public class PostRequest {
    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Create {
        private Long memberSeq;
        private String title;
        private String content;
        private String imageURL;
        private Long postWidth;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Update {
        private Long postSeq;
        private String title;
        private String content;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Delete {
        private Long postSeq;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class List {
        private Long currentPage;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Info {
        private Long postSeq;
    }
}
