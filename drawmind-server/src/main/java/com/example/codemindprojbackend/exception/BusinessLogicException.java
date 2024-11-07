package com.example.codemindprojbackend.exception;

import com.example.codemindprojbackend.api.response.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {
    private ErrorCode errorCode;

    public BusinessLogicException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public BusinessLogicException(ErrorCode errorCode, String msg){
        super(msg);
        this.errorCode = errorCode;
    }
}