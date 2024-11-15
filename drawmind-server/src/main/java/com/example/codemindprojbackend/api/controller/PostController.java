package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.request.PostRequest;
import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.PostResponse;
import com.example.codemindprojbackend.api.response.ResponseCode;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.domain.model.Post;
import com.example.codemindprojbackend.service.LogService;
import com.example.codemindprojbackend.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @PostMapping("/list")
    public ApiResponse<List<PostResponse.ListDetail>> findAllPost(@RequestBody PostRequest.List post_request) {
        int currentPage = post_request.getCurrentPage();
        return ApiResponse.success(ResponseCode.OK, PostResponse.ListDetail.of(postService.findPosts(currentPage, 5)));
    }

    @PostMapping("/write")
    @ResponseBody
    public ApiResponse<PostResponse.WriteResponse> createPost(@RequestBody PostRequest.Create request) {
        return ApiResponse.success(ResponseCode.OK, postService.createPost(request));
    }

    @PostMapping("/update")
    @ResponseBody
    public ApiResponse<PostResponse.Detail> updatePost(@RequestBody PostRequest.Update request) {
        return ApiResponse.success(ResponseCode.OK, postService.updatePost(request));
    }

    @PostMapping("/delete")
    @ResponseBody
    public ApiResponse<Integer> deletePost(@RequestBody PostRequest.Delete request) {
        postService.deleteById(request.getPostSeq());
        return ApiResponse.success(ResponseCode.OK);
    }

    @PostMapping("/detail")
    @ResponseBody
    public ApiResponse<PostResponse.Detail> findPostById(@RequestBody PostRequest.Info request) {
        return ApiResponse.success(ResponseCode.OK, PostResponse.Detail.of(postService.findPostById(request.getPostSeq())));
    }
}
