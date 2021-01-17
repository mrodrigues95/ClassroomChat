import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';

export type GetDiscussionResponse = {
  id: number;
  classroomId: number;
  name: string;
};

const getDiscussionById = async (discussionId: string) => {
  return await axios
    .get<GetDiscussionResponse>(`discussion/${discussionId}`)
    .then((res) => res.data);
};

const useDiscussion = (discussionId: string) => {
  return useQuery(['discussion', discussionId], () =>
    getDiscussionById(discussionId)
  );
};

export default useDiscussion;
