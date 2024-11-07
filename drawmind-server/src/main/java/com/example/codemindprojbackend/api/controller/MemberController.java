package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.request.MemberRequest;
import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.MemberResponse;
import com.example.codemindprojbackend.api.response.ResponseCode;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.service.LogService;
import com.example.codemindprojbackend.service.MemberService;
import com.example.codemindprojbackend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final LogService logService;
    private final PostService postService;

    @PostMapping("/join")
    @ResponseBody
    public ApiResponse<MemberResponse.Detail> registerMember(@RequestBody MemberRequest.Create request) {
        return ApiResponse.success(ResponseCode.OK, memberService.registerMember(request));
    }

    @PostMapping("/update")
    @ResponseBody
    public ApiResponse<MemberResponse.Detail> updateMember(@RequestBody MemberRequest.Update member_request) {
        logService.saveLog(LogType.MEMBER_MODIFY, member_request.getMemberSeq());
        return ApiResponse.success(ResponseCode.OK, memberService.updateMember(member_request, member_request.getMemberSeq()));
    }

    @PostMapping("/info")
    @ResponseBody
    public MemberResponse.Detail findMemberOne(@RequestBody MemberRequest.Info member_info) {
        return MemberResponse.Detail.of(memberService.findMemberById(member_info.getMemberSeq()));
    }

    @PostMapping("/quit")
    @ResponseBody
    public ApiResponse<Void> deleteMember(@RequestBody MemberRequest.Delete member_request) {
        Long currentSeq = member_request.getMemberSeq();
        logService.deleteAllLogsByMemberId(currentSeq);
        postService.deleteAllMemosByMemberId(currentSeq);
        memberService.deleteById(currentSeq);
        return ApiResponse.success(ResponseCode.OK);
    }
}