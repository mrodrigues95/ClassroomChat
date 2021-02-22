import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { DiscussionMessages } from '../../shared/types/api';

const getById = async (discussionId: string) => {
  return await axios
    .get<DiscussionMessages>(`discussion/${discussionId}/message/list`)
    .then((res) => res.data);
};

const useQueryDiscussionMessages = (discussionId: string) => {
  return useQuery<DiscussionMessages, Error>(
    ['discussionMessages', discussionId],
    () => getById(discussionId),
    { refetchOnWindowFocus: false }
  );
};

export default useQueryDiscussionMessages;
