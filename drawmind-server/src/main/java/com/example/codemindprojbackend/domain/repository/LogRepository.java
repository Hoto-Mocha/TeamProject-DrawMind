package com.example.codemindprojbackend.domain.repository;

import com.example.codemindprojbackend.domain.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LogRepository extends JpaRepository<Log, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Log l WHERE l.member.memberId = :memberId")
    void deleteAllByMemberId(Long memberId);
}
