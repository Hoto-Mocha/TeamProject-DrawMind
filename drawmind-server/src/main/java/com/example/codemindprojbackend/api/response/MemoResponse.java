package com.example.codemindprojbackend.api.response;

import com.example.codemindprojbackend.domain.model.Post;
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

        public static MemoResponse.Detail of(Post post) {
            return Detail.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .memoType(post.getMemoType())
                    .build();
        }

        public static List<Detail> of(List<Post> posts) {
            return posts.stream()
                    .map(MemoResponse.Detail::of)
                    .collect(Collectors.toList());
        }
    }
}
