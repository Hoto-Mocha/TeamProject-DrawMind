package com.example.codemindprojbackend.service;

import com.example.codemindprojbackend.api.request.MemoRequest;
import com.example.codemindprojbackend.api.response.MemoResponse;
import com.example.codemindprojbackend.domain.model.Memo;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.repository.MemoRepository;
import com.example.codemindprojbackend.domain.repository.MemberRepository;
import com.example.codemindprojbackend.exception.BusinessLogicException;
import com.example.codemindprojbackend.api.response.ErrorCode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MemoService {

    @Autowired
    private MemoRepository memoRepository;

    @Autowired
    private MemberRepository memberRepository;

    public MemoResponse.Detail createMemo(MemoRequest.Create request) {
        System.out.println(request);
        Member member = memberRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Member not found"));
        Memo memo = new Memo(request.getMemoType(), member, request.getTitle(), request.getContent());
        memoRepository.save(memo);
        return MemoResponse.Detail.of(memo);
    }

    public MemoResponse.Detail updateMemo(Long id, MemoRequest.Update request) {
        Memo memo = memoRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
        memo.setTitle(request.getTitle());
        memo.setContent(request.getContent());
        memo.setMemoType(request.getMemoType());
        memoRepository.save(memo);
        return MemoResponse.Detail.of(memo);
    }

    public void deleteById(Long id) {
        memoRepository.deleteById(id);
    }

    public Memo findMemoById(Long id) {
        return memoRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
    }

    public List<Memo> findAllMemos() {
        return memoRepository.findAll();
    }

    public List<Memo> findAllReversedMemos() {
        return memoRepository.findAllMemosInReverseOrder();
    }

    public void deleteAllMemosByMemberId(Long memberId) {
        memoRepository.deleteAllByMemberId(memberId);
    }
}
