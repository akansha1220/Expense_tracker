/* eslint-disable prettier/prettier */
export type InfinityPaginationResultType<T> = Readonly<{
    data: T[];
    hasNextPage: boolean;
  }>;