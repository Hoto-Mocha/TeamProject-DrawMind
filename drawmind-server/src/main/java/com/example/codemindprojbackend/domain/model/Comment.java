package com.example.codemindprojbackend.domain.model;

import jakarta.persistence.*;

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_seq")
    private Long seq;

    @ManyToOne
    Post post;

    @ManyToOne
    Member member;

    private String content;
}
