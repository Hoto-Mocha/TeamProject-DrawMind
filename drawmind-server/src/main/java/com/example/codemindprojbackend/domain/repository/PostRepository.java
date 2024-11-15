package com.example.codemindprojbackend.domain.repository;

import com.example.codemindprojbackend.domain.model.Post;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT p FROM Post p")
    List<Post> findAllPosts(Pageable pageable);
}
