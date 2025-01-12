/* eslint-disable prettier/prettier */
import { IPaginationOptions } from './types/pagination-options'
import { InfinityPaginationResultType } from './types/infinity-pagination-result';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};