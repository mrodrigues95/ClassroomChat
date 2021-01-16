import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';

type GetDiscussionResponse = {
  id: number;
  classroomId: number;
  name: string;
};

const useDiscussion = (discussionId: string) => {
  return useQuery(['discussion', discussionId], () =>
    axios
      .get<GetDiscussionResponse>(`discussion/${discussionId}`)
      .then((res) => res.data)
  );
};

export default useDiscussion;
