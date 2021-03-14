// import { useMutation, useQueryClient } from 'react-query';
// import { axios } from '../../shared/hooks/auth/useToken';
// import { Message } from '../../shared/types/api';
// import { getRandomAvatar } from '../../shared/utils/getRandomAvatar';

// const createDiscussionMessage = async (
//   newMessage: PostDiscussionMessageRequest
// ) => {
//   return await axios
//     .post<PostDiscussionMessageRequest>(
//       `discussions/${newMessage.discussionId}/message`,
//       newMessage
//     )
//     .then((res) => res.data);
// };

// const useMutationCreateDiscussionMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation(createDiscussionMessage, {
//     onMutate: async (newMessage: PostDiscussionMessageRequest) => {
//       await queryClient.cancelQueries([
//         'discussionMessages',
//         newMessage.discussionId,
//       ]);

//       const previousMessages = queryClient.getQueryData<Message[]>([
//         'discussionMessages',
//         newMessage.discussionId,
//       ]);

//       queryClient.setQueryData<Message[]>(
//         ['discussionMessages', newMessage.discussionId],
//         {
//           ...previousMessages,
//           messages: [
//             ...previousMessages?.messages,
//             {
//               ...newMessage,
//               id: Math.random(),
//               createdAt: new Date(),
//               createdBy: 'temp',
//               createdByImageUrl: getRandomAvatar(),
//             },
//           ],
//         }
//       );

//       return { previousMessages, newMessage };
//     },
//     onError: (err, newMessage, context) => {
//       queryClient.setQueryData(
//         ['discussionMessages', context?.newMessage?.discussionId],
//         context?.previousMessages
//       );
//     },
//     onSettled: (newMessage) => {
//       queryClient.invalidateQueries([
//         'discussionMessages',
//         newMessage?.discussionId,
//       ]);
//     },
//   });
// };

// export default useMutationCreateDiscussionMessage;

const test = 'test';
export default test;
