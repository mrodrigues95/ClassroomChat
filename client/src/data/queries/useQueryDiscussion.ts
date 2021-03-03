import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Discussion } from '../../shared/types/api';

const getById = async (discussionId: string) => {
  return await axios
    .get<Discussion>(`discussions/${discussionId}`)
    .then((res) => res.data);
};

const useQueryDiscussion = (discussionId: string) => {
  return useQuery<Discussion, Error>(
    ['discussion', discussionId],
    () => getById(discussionId),
    { refetchOnWindowFocus: false }
  );
};

export default useQueryDiscussion;
