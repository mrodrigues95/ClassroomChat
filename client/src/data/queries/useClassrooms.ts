import { useQuery } from 'react-query';
import { Classroom } from '../../shared/types';
import { axios } from '../../shared/hooks/auth/useToken';

type GetClassroomsResponse = {
  classrooms: Classroom[];
  classroomsCount: number;
};

const getClassrooms = async () => {
  return await axios
    .get<GetClassroomsResponse>('classroom/list')
    .then((res) => res.data);
};

const useClassrooms = () => {
  return useQuery('classrooms', getClassrooms, { enabled: false });
};

export default useClassrooms;
