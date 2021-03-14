import { useInfiniteQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Message } from '../../shared/types/api';
import { PaginatedResult, PaginatedCursor } from '../../shared/types/utils';
import { isEmpty } from './../../shared/utils/stringValidation';

const getById = async (discussionId: string, cursor: string | null) => {
  let url = `discussions/${discussionId}/messages?size=20`;
  if (cursor) url = url + `&cursor=${cursor}`;
  return await axios
    .get<PaginatedResult<Message[]>>(url)
    .then((res) => res as PaginatedResult<Message[]>);
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

export default useQueryDiscussionMessages;
