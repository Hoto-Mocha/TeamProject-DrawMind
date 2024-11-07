package com.example.codemindprojbackend.domain.repository;

import com.example.codemindprojbackend.domain.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Post m WHERE m.writer.memberId = :memberId")
    void deleteAllByMemberId(Long memberId);

    @Query("SELECT m FROM Post m ORDER BY m.writeDt DESC")
    List<Post> findAllMemosInReverseOrder();
}
