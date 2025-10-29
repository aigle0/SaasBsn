package com.bsn.beta.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory,Integer> {

    @Query("""
            SELECT history
            FROM TransactionHistory history
            WHERE history.user.id = :userId
            """)
    Page<TransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT history
            FROM TransactionHistory history
            WHERE history.book.owner.id = :userId
            """)
    Page<TransactionHistory> findAllReturnedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT (count(*)>0) AS isBorrowed
            FROM TransactionHistory history
            WHERE history.user.id = :userId
            AND history.book.id = :bookId
            AND history.returnApproved = false
            """)
    boolean isAlreadyBorrowedByYser(Integer bookId, Integer userId);

    @Query("""
            SELECT history
            FROM TransactionHistory history
            WHERE history.user.id = :userId
            AND history.book.id = :bookId
            AND history.returned = false
            AND history.returnApproved = false
            """)
    Optional<TransactionHistory> findBookIdAndUserId(Integer bookId, Integer userId);

    @Query("""
            SELECT history
            FROM TransactionHistory history
            WHERE history.user.id = :userId
            AND history.book.id = :bookId
            AND history.returned = true
            AND history.returnApproved = false
            """)
    Optional<TransactionHistory> findBookIdAndOwnerId(Integer bookId, Integer id);
}
