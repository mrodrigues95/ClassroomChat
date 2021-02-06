import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Discussion } from '../../shared/types';

const getDiscussionById = async (discussionId: string) => {
  return await axios
    .get<Discussion>(`discussion/${discussionId}`)
    .then((res) => res.data);
};

const useDiscussion = (discussionId: string) => {
  return useQuery(['discussion', discussionId], () =>
    getDiscussionById(discussionId), { refetchOnWindowFocus: false }
  );
};

export default useDiscussion;
