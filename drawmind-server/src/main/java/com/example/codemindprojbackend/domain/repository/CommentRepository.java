package com.example.codemindprojbackend.domain.repository;

import com.example.codemindprojbackend.domain.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
