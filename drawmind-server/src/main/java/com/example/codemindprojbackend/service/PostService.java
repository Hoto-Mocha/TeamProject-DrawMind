package com.example.codemindprojbackend.service;

import com.example.codemindprojbackend.api.request.PostRequest;
import com.example.codemindprojbackend.api.response.PostResponse;
import com.example.codemindprojbackend.domain.model.Post;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.repository.PostRepository;
import com.example.codemindprojbackend.domain.repository.MemberRepository;
import com.example.codemindprojbackend.exception.BusinessLogicException;
import com.example.codemindprojbackend.api.response.ErrorCode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    public PostResponse.WriteResponse createPost(PostRequest.Create request) {
        System.out.println(request);
        Member member = memberRepository.findById(request.getMemberSeq())
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Member not found"));
        Post post = new Post(member, request.getTitle(), request.getContent(), request.getImageURL(), request.getPostWidth());
        postRepository.save(post);
        return PostResponse.WriteResponse.of(post);
    }

    public PostResponse.Detail updatePost(PostRequest.Update request) {
        Post post = postRepository.findById(request.getPostSeq())
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setImgURL(request.getImageURL());
        post.setPostWidth(request.getPostWidth());
        postRepository.save(post);
        return PostResponse.Detail.of(post);
    }

    public void deleteById(Long id) {
        postRepository.deleteById(id);
    }

    public Post findPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ErrorCode.NOT_FOUND, "Memo not found"));
    }

    public void deleteAllPostsByMemberSeq(Long memberId) {
        postRepository.deleteAllByMemberSeq(memberId);
    }

    public List<Post> findPosts(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return postRepository.findAllPosts(pageable);
    }
}
