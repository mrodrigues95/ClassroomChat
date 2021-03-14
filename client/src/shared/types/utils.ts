import { AxiosResponse } from 'axios';

export type PaginatedResult<T> = {
  data: T;
  pagination: PaginatedCursor | PaginatedOffsetLimit;
} & AxiosResponse;

export type PaginatedCursor = {
  previousCursor: string;
  nextCursor: string;
};

export type PaginatedOffsetLimit = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};
