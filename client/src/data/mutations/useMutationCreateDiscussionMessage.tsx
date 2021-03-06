import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { DiscussionMessages } from '../../shared/types/api';
import { getRandomAvatar } from '../../shared/utils/getRandomAvatar';

export type PostDiscussionMessageRequest = {
  discussionId: number | string;
  body: string;
};

const createDiscussionMessage = async (
  newMessage: PostDiscussionMessageRequest
) => {
  return await axios
    .post<PostDiscussionMessageRequest>(
      `discussions/${newMessage.discussionId}/message`,
      newMessage
    )
    .then((res) => res.data);
};

const useMutationCreateDiscussionMessage = () => {
  const queryClient = useQueryClient();

  return useMutation(createDiscussionMessage, {
    onMutate: async (newMessage: PostDiscussionMessageRequest) => {
      await queryClient.cancelQueries([
        'discussionMessages',
        newMessage.discussionId,
      ]);

      const previousMessages = queryClient.getQueryData<DiscussionMessages>([
        'discussionMessages',
        newMessage.discussionId,
      ]);

      queryClient.setQueryData<DiscussionMessages>(
        ['discussionMessages', newMessage.discussionId],
        {
          ...previousMessages,
          messages: [
            ...previousMessages?.messages,
            {
              ...newMessage,
              id: Math.random(),
              createdAt: new Date(),
              createdBy: 'temp',
              createdByImageUrl: getRandomAvatar(),
            },
          ],
        }
      );

      return { previousMessages, newMessage };
    },
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(
        ['discussionMessages', context?.newMessage?.discussionId],
        context?.previousMessages
      );
    },
    onSettled: (newMessage) => {
      queryClient.invalidateQueries([
        'discussionMessages',
        newMessage?.discussionId,
      ]);
    },
  });
};

export default useMutationCreateDiscussionMessage;