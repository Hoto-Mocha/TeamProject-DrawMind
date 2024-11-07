package com.example.codemindprojbackend.api.advice;

import com.example.codemindprojbackend.api.response.ApiErrorResponse;
import com.example.codemindprojbackend.exception.BusinessLogicException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(BusinessLogicException.class)
    public ApiErrorResponse handleIllegalArgumentException(BusinessLogicException e){
        return ApiErrorResponse.fail(e.getErrorCode(), e.getMessage());
    }
}