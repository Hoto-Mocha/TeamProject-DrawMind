package com.example.codemindprojbackend.service;

import com.example.codemindprojbackend.api.request.MemoRequest;
import com.example.codemindprojbackend.api.response.MemoResponse;
import com.example.codemindprojbackend.domain.model.Post;
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
        Post post = new Post(request.getMemoType(), member, request.getTitle(), request.getContent());
        memoRepository.save(post);
        return MemoResponse.Detail.of(post);
    }

    public MemoResponse.Detail updateMemo(Long id, MemoRequest.Update request) {
        Post post = memoRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setMemoType(request.getMemoType());
        memoRepository.save(post);
        return MemoResponse.Detail.of(post);
    }

    public void deleteById(Long id) {
        memoRepository.deleteById(id);
    }

    public Post findMemoById(Long id) {
        return memoRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
    }

    public List<Post> findAllMemos() {
        return memoRepository.findAll();
    }

    public List<Post> findAllReversedMemos() {
        return memoRepository.findAllMemosInReverseOrder();
    }

    public void deleteAllMemosByMemberId(Long memberId) {
        memoRepository.deleteAllByMemberId(memberId);
    }
}
