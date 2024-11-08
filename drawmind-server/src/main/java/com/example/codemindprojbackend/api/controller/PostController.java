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
    private final LogService logService;
    private final Long pageGroupCnt = 20L;

    //TODO : implement page based on pageGroupCnt.
    @PostMapping("/list")
    public List<PostResponse.Detail> findAllPost(@RequestBody PostRequest.List post_request) {
        return null;
    }

    @PostMapping("/write")
    @ResponseBody
    public ApiResponse<PostResponse.WriteResponse> createPost(@RequestBody PostRequest.Create request) {
        return ApiResponse.success(ResponseCode.OK, postService.createPost(request));
    }

    @PostMapping("/update")
    @ResponseBody
    public ApiResponse<PostResponse.Detail> updatePost(@RequestBody PostRequest.Update request) {
        System.out.println(request);
        logService.saveLog(LogType.POST_MODIFY, request.getPostSeq());
        return ApiResponse.success(ResponseCode.OK, postService.updatePost(request));
    }

    @PostMapping("/delete")
    @ResponseBody
    public ApiResponse<Integer> deletePost(@RequestBody PostRequest.Delete request) {
        logService.saveLog(LogType.POST_DELETE, request.getPostSeq());
        postService.deleteById(request.getPostSeq());
        return ApiResponse.success(ResponseCode.OK);
    }

    @PostMapping("/detail")
    @ResponseBody
    public PostResponse.Detail findPostById(@RequestBody PostRequest.Info request) {
        return PostResponse.Detail.of(postService.findPostById(request.getPostSeq()));
    }
}