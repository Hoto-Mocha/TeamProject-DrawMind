package com.example.codemindprojbackend.api.response;

import com.example.codemindprojbackend.domain.model.Member;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class MemberResponse {
    @Getter
    @Setter
    @Builder
    public static class Detail {
        private Long memberId;
        private String email;
        private String password;

        public static MemberResponse.Detail of(Member member) {
            return Detail.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .password(member.getPassword())
                    .build();
        }
    }
}
