import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../shared/hooks/auth/useAuth';
import { axios } from '../../shared/hooks/auth/useToken';
import { DiscussionMessages } from '../../shared/types/api';

export type PostDiscussionMessageRequest = {
  discussionId: number | string;
  body: string;
};

const createDiscussionMessage = async (
  newMessage: PostDiscussionMessageRequest
) => {
  return await axios
    .post<PostDiscussionMessageRequest>(
      `discussion/${newMessage.discussionId}/message`,
      newMessage
    )
    .then((res) => res.data);
};

const useCreateDiscussionMessage = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext)!;

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
              createdBy: user?.name ?? 'temp',
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

export default useCreateDiscussionMessage;
