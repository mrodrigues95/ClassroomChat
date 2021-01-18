import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Discussion, Message } from '../../shared/types';

export type GetDiscussionMessagesResponse = {
  discussion: Discussion;
  messages: Message[];
};

const getDiscussionMessagesById = async (discussionId: string) => {
  return await axios
    .get<GetDiscussionMessagesResponse>(
      `discussion/${discussionId}/message/list`
    )
    .then((res) => res.data);
};

const useDiscussionMessages = (discussionId: string) => {
  return useQuery(['discussionMessages', discussionId], () =>
    getDiscussionMessagesById(discussionId)
  );
};

export default useDiscussionMessages;
