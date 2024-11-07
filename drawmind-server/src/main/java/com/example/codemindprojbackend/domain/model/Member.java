package com.example.codemindprojbackend.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_seq")
    private Long seq;
    private String memberId;
    private String password;

    @Column(name = "member_type")
    @Enumerated(EnumType.ORDINAL)
    private MemberType memberType;

    public Member(String memberId, String password, MemberType memberType) {
        this.memberType = memberType;
        this.memberId = memberId;
        this.password = password;
    }
}
