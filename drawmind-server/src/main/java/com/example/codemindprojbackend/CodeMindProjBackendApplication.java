package com.example.codemindprojbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CodeMindProjBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeMindProjBackendApplication.class, args);
    }

}
