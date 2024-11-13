package com.example.codemindprojbackend.api.request;

import com.example.codemindprojbackend.domain.model.Member;
import lombok.*;

public class MemberRequest {
    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Create {
        private String memberId;
        private String password;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Update {
        private Long memberSeq;
        private String password;
    }
    //{memberSeq : 10, password : "asdf"}

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Delete {
        private Long memberSeq;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Login {
        private String memberId;
        private String password;
    }

}
