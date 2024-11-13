package com.example.codemindprojbackend.api.response;

import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.model.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostResponse {
    @Getter
    @Setter
    @Builder
    public static class ListDetail {
        private Long postSeq;
        private String postTitle;
        private String writer;
        private LocalDateTime regDate;

        public static ListDetail of(Post post) {
            return ListDetail.builder()
                    .postSeq(post.getSeq())
                    .postTitle(post.getTitle())
                    .regDate(post.getWriteDt())
                    .build();
        }

        public static List<ListDetail> of(List<Post> posts) {
            return posts.stream()
                    .map(PostResponse.ListDetail::of)
                    .collect(Collectors.toList());
        }
    }


    @Getter
    @Setter
    @Builder
    public static class Detail {
        private String postTitle;
        private String writer;
        private String content;
        private String imgURL;
        private LocalDateTime regDate;
        private Long postWidth;

        public static Detail of(Post post) {
            return Detail.builder()
                    .postTitle(post.getTitle())
                    .writer(post.getWriter().getMemberId())
                    .content(post.getContent())
                    .imgURL(post.getImgURL())
                    .regDate(post.getWriteDt())
                    .postWidth(post.getPostWidth())
                    .build();
        }

        public static List<Detail> of(List<Post> posts) {
            return posts.stream()
                    .map(PostResponse.Detail::of)
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @Setter
    @Builder
    public static class WriteResponse {
        private Long postSeq;

        public static WriteResponse of(Post post) {
            return WriteResponse.builder()
                    .postSeq(post.getSeq())
                    .build();
        }
    }


}
