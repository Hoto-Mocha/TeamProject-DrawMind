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
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @CreatedDate
    @Column(name = "create_dt")
    private LocalDateTime createDt;

    @Column(name = "member_ip")
    private String memberIp;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "log_type")
    private LogType logType;

    public Log(LogType logType, Member member, String memberIp) {
        this.logType = logType;
        this.member = member;
        this.memberIp = memberIp;
    }

    public Log(LogType logType, String memberIp) {
        this.logType = logType;
        this.memberIp = memberIp;
        this.member = null;
    }
}
