package com.example.codemindprojbackend.api.response;

import com.example.codemindprojbackend.domain.model.Log;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.domain.model.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class LogResponse {
    @Getter
    @Setter
    @Builder
    public static class Detail {
        private Long id;
        private Member member;
        private LogType logType;
        private LocalDateTime createDt;
        private String memberIp;

        public static Detail of(Log log) {
            return Detail.builder()
                    .id(log.getId())
                    .member(log.getMember())
                    .logType(log.getLogType())
                    .createDt(log.getCreateDt())
                    .memberIp(log.getMemberIp())
                    .build();
        }
    }
}
