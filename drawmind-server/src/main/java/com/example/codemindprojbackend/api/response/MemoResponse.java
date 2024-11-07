package com.example.codemindprojbackend.api.response;

import com.example.codemindprojbackend.domain.model.Memo;
import com.example.codemindprojbackend.domain.model.MemoType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

public class MemoResponse {
    @Getter
    @Setter
    @Builder
    public static class Detail {
        private Long id;
        private String title;
        private String content;
        private MemoType memoType;

        public static MemoResponse.Detail of(Memo memo) {
            return Detail.builder()
                    .id(memo.getId())
                    .title(memo.getTitle())
                    .content(memo.getContent())
                    .memoType(memo.getMemoType())
                    .build();
        }

        public static List<Detail> of(List<Memo> memos) {
            return memos.stream()
                    .map(MemoResponse.Detail::of)
                    .collect(Collectors.toList());
        }
    }
}
