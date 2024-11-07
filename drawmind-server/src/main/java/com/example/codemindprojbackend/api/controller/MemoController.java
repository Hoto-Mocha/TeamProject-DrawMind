package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.request.MemoRequest;
import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.MemoResponse;
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
@RequestMapping("/memos")
public class MemoController {
    private final PostService postService;
    private final LogService logService;

    @PostMapping
    @ResponseBody
    public ApiResponse<MemoResponse.Detail> createMemo(@RequestBody MemoRequest.Create request) {
        return ApiResponse.success(ResponseCode.OK, postService.createMemo(request));
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ApiResponse<MemoResponse.Detail> updateMemo(@PathVariable Long id, @RequestBody MemoRequest.Update request, HttpServletRequest http_Request) {
        System.out.println(request);
        logService.saveLog(LogType.MEMO_MODIFY, http_Request, request.getUserEmail());
        return ApiResponse.success(ResponseCode.OK, postService.updateMemo(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ApiResponse<Integer> deleteMemo(@PathVariable Long id, @RequestBody MemoRequest.Delete request, HttpServletRequest http_request) {
        logService.saveLog(LogType.MEMO_DELETE, http_request, request.getUserEmail());
        postService.deleteById(id);
        return ApiResponse.success(ResponseCode.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public MemoResponse.Detail findMemoById(@PathVariable Long id) {
        return MemoResponse.Detail.of(postService.findMemoById(id));
    }

    @GetMapping
    public List<MemoResponse.Detail> findAllMemo() {
        List<Post> posts = postService.findAllReversedMemos();
        return MemoResponse.Detail.of(posts);
    }
}
