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
        private Long memberSeq;
        private String memberId;
        private String password;

        public static MemberResponse.Detail of(Member member) {
            return Detail.builder()
                    .memberSeq(member.getSeq())
                    .memberId(member.getMemberId())
                    .password(member.getPassword())
                    .build();
        }
    }
}
