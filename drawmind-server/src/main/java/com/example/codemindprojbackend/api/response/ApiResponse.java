package com.example.codemindprojbackend.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse<T> {
    private ResponseCode code;
    private T data;

    public static <T> ApiResponse<T> success(ResponseCode code, T data) {
        return ApiResponse.<T>builder()
                .code(code)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(ResponseCode code) {
        return ApiResponse.<T>builder()
                .code(code)
                .build();
    }
}
