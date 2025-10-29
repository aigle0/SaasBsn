/* tslint:disable */
/* eslint-disable */
import { ReturnedBookResponse } from '../models/returned-book-response';
export interface PageResponseReturnedBookResponse {
  content?: Array<ReturnedBookResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
