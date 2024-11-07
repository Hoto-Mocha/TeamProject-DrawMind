package com.example.codemindprojbackend.service;

import com.example.codemindprojbackend.api.request.MemoRequest;
import com.example.codemindprojbackend.api.response.MemoResponse;
import com.example.codemindprojbackend.domain.model.Post;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.repository.PostRepository;
import com.example.codemindprojbackend.domain.repository.MemberRepository;
import com.example.codemindprojbackend.exception.BusinessLogicException;
import com.example.codemindprojbackend.api.response.ErrorCode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    public MemoResponse.Detail createMemo(MemoRequest.Create request) {
        System.out.println(request);
        Member member = memberRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Member not found"));
        Post post = new Post(null, null, null, null);
        postRepository.save(post);
        return MemoResponse.Detail.of(post);
    }

    public MemoResponse.Detail updateMemo(Long id, MemoRequest.Update request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        postRepository.save(post);
        return MemoResponse.Detail.of(post);
    }

    public void deleteById(Long id) {
        postRepository.deleteById(id);
    }

    public Post findMemoById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
    }

    public List<Post> findAllMemos() {
        return postRepository.findAll();
    }

    public List<Post> findAllReversedMemos() {
        return postRepository.findAllMemosInReverseOrder();
    }

    public void deleteAllMemosByMemberId(Long memberId) {
        postRepository.deleteAllByMemberId(memberId);
    }
}
