package com.example.codemindprojbackend.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_seq")
    private Long seq;

    @ManyToOne
    @JoinColumn(name = "post_seq")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

    private String content;

    public Comment(Post post, Member member, String content) {
        this.post = post;
        this.member = member;
        this.content = content;
    }
}
