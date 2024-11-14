package com.example.codemindprojbackend.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@RequiredArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_seq")
    private Long seq;

    @ManyToOne
    @JoinColumn(name = "writer")
    private Member writer;

    @LastModifiedDate
    @Column(name = "write_dt")
    private LocalDateTime writeDt;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT", name = "img_url")
    private String imgURL;

    private Long postWidth;

    public Post(Member writer, String title, String content, String imgURL, Long postWidth) {
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.imgURL = imgURL;
        this.postWidth = postWidth;
    }
}