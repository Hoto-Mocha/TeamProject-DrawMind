package com.example.codemindprojbackend.service;

import com.example.codemindprojbackend.api.request.MemberRequest;
import com.example.codemindprojbackend.api.response.ErrorCode;
import com.example.codemindprojbackend.api.response.MemberResponse;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.repository.MemberRepository;
import com.example.codemindprojbackend.exception.BusinessLogicException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public Member findMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Could not find member"));
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Could not find member"));
    }

    public void deleteById(Long id) {
        memberRepository.deleteById(id);
    }

    public MemberResponse.Detail registerMember(MemberRequest.Create request) {
        Member member = new Member(request.getEmail(), request.getPassword());
        memberRepository.save(member);
        return MemberResponse.Detail.of(member);
    }

    public MemberResponse.Detail updateMember(MemberRequest.Update request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Could not find member"));
        member.setPassword(request.getPassword());
        memberRepository.save(member);
        return MemberResponse.Detail.of(member);
    }
}
