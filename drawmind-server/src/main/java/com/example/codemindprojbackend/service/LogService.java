package com.example.codemindprojbackend.service;
import com.example.codemindprojbackend.domain.model.Log;
import com.example.codemindprojbackend.domain.model.LogType;
import com.example.codemindprojbackend.domain.model.Member;
import com.example.codemindprojbackend.domain.repository.LogRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LogService {
    @Autowired
    private LogRepository logRepository;

    @Autowired
    private MemberService memberService;

    public void saveLog(LogType logType, Long memberSeq) {
        Member member = memberService.findMemberById(memberSeq);
        Log log = new Log(logType, member);
        System.out.println(log);
        logRepository.save(log);
    }

    public void deleteAllLogsByMemberId(Long memberId) {
        logRepository.deleteAllByMemberId(memberId);
    }
}
