/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnBorrowBook } from '../fn/book/approve-return-borrow-book';
import { ApproveReturnBorrowBook$Params } from '../fn/book/approve-return-borrow-book';
import { BookResponse } from '../models/book-response';
import { borrowBook } from '../fn/book/borrow-book';
import { BorrowBook$Params } from '../fn/book/borrow-book';
import { getAllBook } from '../fn/book/get-all-book';
import { GetAllBook$Params } from '../fn/book/get-all-book';
import { getAllBookByOwner } from '../fn/book/get-all-book-by-owner';
import { GetAllBookByOwner$Params } from '../fn/book/get-all-book-by-owner';
import { getAllBorrowedBook } from '../fn/book/get-all-borrowed-book';
import { GetAllBorrowedBook$Params } from '../fn/book/get-all-borrowed-book';
import { getAllReturnedBook } from '../fn/book/get-all-returned-book';
import { GetAllReturnedBook$Params } from '../fn/book/get-all-returned-book';
import { getBookById } from '../fn/book/get-book-by-id';
import { GetBookById$Params } from '../fn/book/get-book-by-id';
import { PageResponseBookResponse } from '../models/page-response-book-response';
import { PageResponseBorrowedBookResponse } from '../models/page-response-borrowed-book-response';
import { PageResponseReturnedBookResponse } from '../models/page-response-returned-book-response';
import { returnBorrowBook } from '../fn/book/return-borrow-book';
import { ReturnBorrowBook$Params } from '../fn/book/return-borrow-book';
import { saveBook } from '../fn/book/save-book';
import { SaveBook$Params } from '../fn/book/save-book';
import { updateArchivedStatus } from '../fn/book/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/book/update-archived-status';
import { updateShareableStatus } from '../fn/book/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/book/update-shareable-status';
import { uploadBookCoverPicture } from '../fn/book/upload-book-cover-picture';
import { UploadBookCoverPicture$Params } from '../fn/book/upload-book-cover-picture';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadBookCoverPicture()` */
  static readonly UploadBookCoverPicturePath = '/cover/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBookCoverPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture$Response(params: UploadBookCoverPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBookCoverPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBookCoverPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBookCoverPicture(params: UploadBookCoverPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBookCoverPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowBook()` */
  static readonly BorrowBookPath = '/borrow/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook$Response(params: BorrowBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowBook(params: BorrowBook$Params, context?: HttpContext): Observable<number> {
    return this.borrowBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllBook()` */
  static readonly GetAllBookPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook$Response(params?: GetAllBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getAllBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook(params?: GetAllBook$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getAllBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `saveBook()` */
  static readonly SaveBookPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook$Response(params: SaveBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook(params: SaveBook$Params, context?: HttpContext): Observable<number> {
    return this.saveBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/shareable/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowBook()` */
  static readonly ReturnBorrowBookPath = '/borrow/return/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowBook$Response(params: ReturnBorrowBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowBook(params: ReturnBorrowBook$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnBorrowBook()` */
  static readonly ApproveReturnBorrowBookPath = '/borrow/return/approve/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnBorrowBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowBook$Response(params: ApproveReturnBorrowBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnBorrowBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnBorrowBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowBook(params: ApproveReturnBorrowBook$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnBorrowBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/archived/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getBookById()` */
  static readonly GetBookByIdPath = '/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookById$Response(params: GetBookById$Params, context?: HttpContext): Observable<StrictHttpResponse<BookResponse>> {
    return getBookById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookById(params: GetBookById$Params, context?: HttpContext): Observable<BookResponse> {
    return this.getBookById$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookResponse>): BookResponse => r.body)
    );
  }

  /** Path part for operation `getAllReturnedBook()` */
  static readonly GetAllReturnedBookPath = '/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllReturnedBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReturnedBook$Response(params?: GetAllReturnedBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseReturnedBookResponse>> {
    return getAllReturnedBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllReturnedBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReturnedBook(params?: GetAllReturnedBook$Params, context?: HttpContext): Observable<PageResponseReturnedBookResponse> {
    return this.getAllReturnedBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseReturnedBookResponse>): PageResponseReturnedBookResponse => r.body)
    );
  }

  /** Path part for operation `getAllBookByOwner()` */
  static readonly GetAllBookByOwnerPath = '/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookByOwner$Response(params?: GetAllBookByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBookResponse>> {
    return getAllBookByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookByOwner(params?: GetAllBookByOwner$Params, context?: HttpContext): Observable<PageResponseBookResponse> {
    return this.getAllBookByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBookResponse>): PageResponseBookResponse => r.body)
    );
  }

  /** Path part for operation `getAllBorrowedBook()` */
  static readonly GetAllBorrowedBookPath = '/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBorrowedBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBorrowedBook$Response(params?: GetAllBorrowedBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedBookResponse>> {
    return getAllBorrowedBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBorrowedBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBorrowedBook(params?: GetAllBorrowedBook$Params, context?: HttpContext): Observable<PageResponseBorrowedBookResponse> {
    return this.getAllBorrowedBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedBookResponse>): PageResponseBorrowedBookResponse => r.body)
    );
  }

}
