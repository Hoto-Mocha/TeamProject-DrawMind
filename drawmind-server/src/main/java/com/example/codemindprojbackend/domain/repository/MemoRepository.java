package com.example.codemindprojbackend.domain.repository;

import com.example.codemindprojbackend.domain.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Memo m WHERE m.member.memberId = :memberId")
    void deleteAllByMemberId(Long memberId);

    @Query("SELECT m FROM Memo m ORDER BY m.writeDt DESC")
    List<Memo> findAllMemosInReverseOrder();
}
