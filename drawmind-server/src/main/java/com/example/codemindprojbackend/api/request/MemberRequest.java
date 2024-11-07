package com.example.codemindprojbackend.api.request;

import com.example.codemindprojbackend.domain.model.Member;
import lombok.*;

public class MemberRequest {
    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Create {
        private Long memberId;
        private String email;
        private String password;
    }

    @Getter
    @Setter
    @ToString
    @RequiredArgsConstructor
    public static class Update {
        private String password;
    }
}
