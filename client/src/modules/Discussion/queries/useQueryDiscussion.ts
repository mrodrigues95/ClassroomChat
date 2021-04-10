import { QueryClient, useQuery } from 'react-query';
import { Discussion } from '../../../common/types';
import { axios } from '../../Auth/hooks/useToken';

const getById = async (discussionId: string) => {
  return await axios
    .get<Discussion>(`discussions/${discussionId}`)
    .then((res) => res.data);
};

const useQueryPrefetchDiscussion = async (
  queryClient: QueryClient,
  discussionId: string
) => {
  await queryClient.prefetchQuery<Discussion, Error>(
    ['discussion', discussionId],
    () => getById(discussionId)
  );
};

const useQueryDiscussion = (discussionId: string) => {
  return useQuery<Discussion, Error>(
    ['discussion', discussionId],
    () => getById(discussionId),
    { refetchOnWindowFocus: false }
  );
};

export { useQueryPrefetchDiscussion, useQueryDiscussion };
