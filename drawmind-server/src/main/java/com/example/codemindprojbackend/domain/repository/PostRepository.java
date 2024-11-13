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
    @Query("DELETE FROM Post p WHERE p.writer.seq = :seq")
    void deleteAllByMemberSeq(Long seq);

    @Query("SELECT p FROM Post p ORDER BY p.writeDt DESC")
    List<Post> findAllPostsInReverseOrder();

    @Query("SELECT p FROM Post p WHERE p.seq BETWEEN :start and :end ORDER BY p.writeDt DESC")
    List<Post> findAllPostsBetween(Long start, Long end);
}
