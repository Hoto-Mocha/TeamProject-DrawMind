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

    private final String[] headerTypes = {"X-Forwarded-For", "Proxy-Client-IP",
            "WL-Proxy-Client-IP", "HTTP_CLIENT_IP", "HTTP_X_FORWARDED_FOR"};
    private String ipAddress;

    public void saveLog(LogType logType, HttpServletRequest http_request, Long id) {
        getClientIp(http_request);
        Member member = memberService.findMemberById(id);
        Log log = new Log(logType, member, ipAddress);
        System.out.println(log);
        logRepository.save(log);
    }

    public void saveLog(LogType logType, HttpServletRequest http_request, String email) {
        getClientIp(http_request);
        Member member = memberService.findMemberByEmail(email);
        Log log = new Log(logType, member, ipAddress);
        System.out.println(log);
        logRepository.save(log);
    }

    public void getClientIp(HttpServletRequest request) {
        ipAddress = null;
        for (String headerType : headerTypes) {
            ipAddress = request.getHeader(headerType);
            if (ipAddress != null && !ipAddress.isEmpty() && !"unknown".equalsIgnoreCase(ipAddress)) {
                break;
            }
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr(); // Fallback to request's remote address
        }
    }

    public void deleteAllLogsByMemberId(Long memberId) {
        logRepository.deleteAllByMemberId(memberId);
    }
}
