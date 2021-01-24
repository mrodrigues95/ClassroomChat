import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { DiscussionMessages } from '../../shared/types';

const getDiscussionMessagesById = async (discussionId: string) => {
  return await axios
    .get<DiscussionMessages>(`discussion/${discussionId}/message/list`)
    .then((res) => res.data);
};

const useDiscussionMessages = (discussionId: string) => {
  return useQuery(['discussionMessages', discussionId], () =>
    getDiscussionMessagesById(discussionId)
  );
};

export default useDiscussionMessages;
