package com.example.codemindprojbackend.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="log_seq")
    private Long seq;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

    @CreatedDate
    @Column(name = "create_dt")
    private LocalDateTime createDt;

    @Enumerated(EnumType.STRING)
    @Column(name = "log_type")
    private LogType logType;

    public Log(LogType logType, Member member) {
        this.logType = logType;
        this.member = member;
    }

}
