import { QueryClient, useInfiniteQuery } from 'react-query';
import {
  Message,
  PaginatedResult,
  PaginatedCursor,
} from '../../../common/types';
import { isEmpty } from '../../../common/utils/stringValidation';
import { axios } from '../../Auth/hooks/useToken';

const getById = async (discussionId: string, cursor: string | null) => {
  let url = `discussions/${discussionId}/messages?size=20`;
  if (cursor) url = url + `&cursor=${cursor}`;
  return await axios
    .get<PaginatedResult<Message[]>>(url)
    .then((res) => res as PaginatedResult<Message[]>);
};

const useQueryPrefetchDiscussionMessages = async (
  queryClient: QueryClient,
  discussionId: string
) => {
  await queryClient.prefetchInfiniteQuery(
    ['discussionMessages', discussionId],
    ({ pageParam }) => getById(discussionId, pageParam),
    {
      getNextPageParam: (lastPage: PaginatedResult<Message[]>) => {
        const nextCursor = (lastPage.pagination as PaginatedCursor).nextCursor;
        if (isEmpty(nextCursor)) return false;
        return nextCursor;
      },
      getPreviousPageParam: (firstPage: PaginatedResult<Message[]>) => {
        const previousCursor = (firstPage.pagination as PaginatedCursor)
          .previousCursor;
        if (isEmpty(previousCursor)) return false;
        return previousCursor;
      },
    }
  );
};

const useQueryDiscussionMessages = (discussionId: string) => {
  return useInfiniteQuery<PaginatedResult<Message[]>, Error>(
    ['discussionMessages', discussionId],
    ({ pageParam }) => getById(discussionId, pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const nextCursor = (lastPage.pagination as PaginatedCursor).nextCursor;
        if (isEmpty(nextCursor)) return false;
        return nextCursor;
      },
      getPreviousPageParam: (firstPage) => {
        const previousCursor = (firstPage.pagination as PaginatedCursor)
          .previousCursor;
        if (isEmpty(previousCursor)) return false;
        return previousCursor;
      },
    }
  );
};

export { useQueryPrefetchDiscussionMessages, useQueryDiscussionMessages };
