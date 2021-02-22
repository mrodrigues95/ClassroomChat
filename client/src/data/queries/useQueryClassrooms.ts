import { useQuery } from 'react-query';
import { Classroom } from '../../shared/types/api';
import { axios } from '../../shared/hooks/auth/useToken';

type Response = {
  classrooms: Classroom[];
  classroomsCount: number;
};

const getClassrooms = async () => {
  return await axios.get<Response>('classroom/list').then((res) => res.data);
};

const useQueryClassrooms = () => {
  return useQuery<Response, Error>('classrooms', getClassrooms, {
    enabled: false,
  });
};

export default useQueryClassrooms;
