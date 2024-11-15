package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.request.MemberRequest;
import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.ErrorCode;
import com.example.codemindprojbackend.api.response.MemberResponse;
import com.example.codemindprojbackend.api.response.ResponseCode;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.exception.BusinessLogicException;
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
        if(memberService.checkMemberById(request.getMemberId()) == null) {
            return ApiResponse.success(ResponseCode.OK, memberService.registerMember(request));
        } else {
            throw new BusinessLogicException(ErrorCode.MEMBER_EXISTS, "Member Already exist.");
        }
    }

    @PostMapping("/update")
    @ResponseBody
    public ApiResponse<Void> updateMember(@RequestBody MemberRequest.Update member_request) {
        logService.saveLog(LogType.MEMBER_MODIFY, member_request.getMemberSeq());
        memberService.updateMember(member_request, member_request.getMemberSeq());
        return ApiResponse.success(ResponseCode.OK);
    }

    @PostMapping("/login")
    @ResponseBody
    public ApiResponse<MemberResponse.Detail> login(@RequestBody MemberRequest.Login member_request) {
        Member member = memberService.findMemberById(member_request.getMemberId());
        if (!member.getPassword().equals(member_request.getPassword())) {
            throw new BusinessLogicException(ErrorCode.NOT_CORRECT, "Invalid password.");
        }
        return ApiResponse.success(ResponseCode.OK,
                MemberResponse.Detail
                        .of(memberService.findMemberById(member_request.getMemberId())));
    }

    @PostMapping("/quit")
    @ResponseBody
    public ApiResponse<Void> deleteMember(@RequestBody MemberRequest.Delete member_request) {
        Long currentSeq = member_request.getMemberSeq();
        logService.deleteAllLogsByMemberSeq(currentSeq);
        postService.deleteAllPostsByMemberSeq(currentSeq);
        memberService.deleteById(currentSeq);
        return ApiResponse.success(ResponseCode.OK);
    }
}