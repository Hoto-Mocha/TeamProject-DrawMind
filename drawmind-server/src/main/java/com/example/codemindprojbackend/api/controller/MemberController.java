package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.request.MemberRequest;
import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.MemberResponse;
import com.example.codemindprojbackend.api.response.ResponseCode;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.service.LogService;
import com.example.codemindprojbackend.service.MemberService;
import com.example.codemindprojbackend.service.MemoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final LogService logService;
    private final MemoService memoService;

    @PostMapping
    @ResponseBody
    public ApiResponse<MemberResponse.Detail> registerMember(@RequestBody MemberRequest.Create request) {
        return ApiResponse.success(ResponseCode.OK, memberService.registerMember(request));
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ApiResponse<MemberResponse.Detail> updateMember(@PathVariable Long id, @RequestBody MemberRequest.Update member_request, HttpServletRequest http_Request) {
        System.out.println(member_request);
        logService.saveLog(LogType.MEMBER_MODIFY, http_Request, id);
        return ApiResponse.success(ResponseCode.OK, memberService.updateMember(member_request, id));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ApiResponse<Void> deleteMember(@PathVariable Long id, HttpServletRequest http_request) {
        logService.deleteAllLogsByMemberId(id);
        memoService.deleteAllMemosByMemberId(id);
        memberService.deleteById(id);
        return ApiResponse.success(ResponseCode.OK);
    }

    @GetMapping("/{email}")
    @ResponseBody
    public MemberResponse.Detail findMemberOne(@PathVariable String email) {
        return MemberResponse.Detail.of(memberService.findMemberByEmail(email));
    }
}