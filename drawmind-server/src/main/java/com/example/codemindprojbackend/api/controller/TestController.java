package com.example.codemindprojbackend.api.controller;

import com.example.codemindprojbackend.api.response.ApiResponse;
import com.example.codemindprojbackend.api.response.ResponseCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    @ResponseBody
    public ApiResponse<String> testApi() {
        return ApiResponse.success(ResponseCode.OK, "Hello, World!");
    }
}
