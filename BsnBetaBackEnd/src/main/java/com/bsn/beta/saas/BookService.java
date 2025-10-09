package com.bsn.beta.saas;

import com.bsn.beta.exception.OperationNotPermittedException;
import com.bsn.beta.history.TransactionHistory;
import com.bsn.beta.history.TransactionHistoryRepository;
import com.bsn.beta.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.bsn.beta.saas.BookSpecification.withOwnerId;


@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final TransactionHistoryRepository historyRepository;

    public Integer save(BookRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Book book = bookMapper.toBook(request);
        book.setOwner(user);
        return bookRepository.save(book).getId();
    }

    public BookResponse getBookById(Integer bookId) {
        return bookRepository.findById(bookId)
                .map(bookMapper::toBookReponse)
                .orElseThrow(()-> new EntityNotFoundException("No book found with the ID:: "+bookId));
    }

    public PageResponse<BookResponse> getAllBook(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("creationDate").descending());
        Page<Book> books = bookRepository.findAllDisplayableBooks(pageable, user.getId());
        List<BookResponse> bookResponse = books.stream()
                .map(bookMapper::toBookReponse)
                .toList();
        return new PageResponse<>(
                bookResponse,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public PageResponse<BookResponse> getAllBookByOwner(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("creationDate").descending());
        Page<Book> books = bookRepository.findAll(withOwnerId(Math.toIntExact(user.getId())),pageable);
        List<BookResponse> bookResponse = books.stream()
                .map(bookMapper::toBookReponse)
                .toList();
        return new PageResponse<>(
                bookResponse,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public PageResponse<BorrowedBookResponse> getAllBorrowedBook(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("creationDate").descending());
        Page<TransactionHistory> allBorrowedBooks = historyRepository.findAllBorrowedBooks(pageable, (user.getId()));
        List<BorrowedBookResponse> borrowedBookResponse = allBorrowedBooks.stream()
                .map(bookMapper::toBorrowedBookReponse)
                .toList();
        return new PageResponse<>(
                borrowedBookResponse,
                allBorrowedBooks.getNumber(),
                allBorrowedBooks.getSize(),
                allBorrowedBooks.getTotalElements(),
                allBorrowedBooks.getTotalPages(),
                allBorrowedBooks.isFirst(),
                allBorrowedBooks.isLast()
        );
    }

    public PageResponse<ReturnedBookResponse> getAllReturnedBook(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("creationDate").descending());
        Page<TransactionHistory> allBorrowedBooks = historyRepository.findAllReturnedBooks(pageable, (user.getId()));
        List<ReturnedBookResponse> returnedBookResponse = allBorrowedBooks.stream()
                .map(bookMapper::toReturnedBookReponse)
                .toList();
        return new PageResponse<>(
                returnedBookResponse,
                allBorrowedBooks.getNumber(),
                allBorrowedBooks.getSize(),
                allBorrowedBooks.getTotalElements(),
                allBorrowedBooks.getTotalPages(),
                allBorrowedBooks.isFirst(),
                allBorrowedBooks.isLast()
        );
    }

    public Integer updateShareableStatus(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + bookId ));
        User user = (User) connectedUser.getPrincipal();
        if(!Objects.equals(user.getId(), book.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot update books shareable status");
        }
        book.setShareable(!book.isShareable());
        bookRepository.save(book);
        return bookId;
    }

    public Integer updateArchivedStatus(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + bookId ));
        User user = (User) connectedUser.getPrincipal();
        if(!Objects.equals(user.getId(), book.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot update books archived status");
        }
        book.setArchived(!book.isArchived());
        bookRepository.save(book);
        return bookId;
    }

    public Integer borrowBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + bookId ));
        if(book.isArchived() || !book.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow books since is not shareable");
        }
        User user = (User) connectedUser.getPrincipal();
        if(Objects.equals(user.getId(), book.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot borrow your own books");
        }
        final boolean isAlreadyBorrowed = historyRepository.isAlreadyBorrowedByYser(bookId, user.getId());
        if(isAlreadyBorrowed){
            throw new OperationNotPermittedException("the request book is already borrowed");
        }
        TransactionHistory transactionHistory = TransactionHistory.builder()
                .user(user)
                .book(book)
                .returnApproved(false)
                .returned(false)
                .build();
        return historyRepository.save(transactionHistory).getId();
    }

    public Integer returnBorrowBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + bookId ));
        if(book.isArchived() || !book.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow books since is not shareable");
        }
        User user = (User) connectedUser.getPrincipal();
        if(Objects.equals(user.getId(), book.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot borrow or return your own books");
        }
        TransactionHistory transactionHistory =  historyRepository.findBookIdAndUserId(bookId, user.getId())
                .orElseThrow(()->new OperationNotPermittedException("You did not borrow this book"));
        transactionHistory.setReturned(true);
        return historyRepository.save(transactionHistory).getId();
    }

    public Integer approveReturnBorrowBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()-> new EntityNotFoundException("No book found with ID:: " + bookId ));
        if(book.isArchived() || !book.isShareable()){
            throw new OperationNotPermittedException("You cannot borrow books since is not shareable");
        }
        User user = (User) connectedUser.getPrincipal();
        if(Objects.equals(user.getId(), book.getOwner().getId())){
            throw new OperationNotPermittedException("You cannot borrow or return your own books");
        }
        TransactionHistory transactionHistory =  historyRepository.findBookIdAndOwnerId(bookId, user.getId())
                .orElseThrow(()->new OperationNotPermittedException("You did not return this book yet, Cannot approve the return"));

        transactionHistory.setReturnApproved(true);
        return historyRepository.save(transactionHistory).getId();
    }


}
