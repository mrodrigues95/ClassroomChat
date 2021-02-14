import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { DiscussionMessages } from '../../shared/types/api';

const getDiscussionMessagesById = async (discussionId: string) => {
  return await axios
    .get<DiscussionMessages>(`discussion/${discussionId}/message/list`)
    .then((res) => res.data);
};

const useDiscussionMessages = (discussionId: string) => {
  return useQuery<DiscussionMessages, Error>(
    ['discussionMessages', discussionId],
    () => getDiscussionMessagesById(discussionId),
    { refetchOnWindowFocus: false }
  );
};

export default useDiscussionMessages;
