import { useQuery } from 'react-query';
import { Classroom } from '../../shared/types';
import { axios } from '../../shared/hooks/auth/useToken';

type GetClassroomsResponse = {
  classrooms: Classroom[];
  classroomsCount: number;
};

const useClassrooms = () => {
  return useQuery(
    'classrooms',
    () =>
      axios
        .get<GetClassroomsResponse>('classroom/list')
        .then((res) => res.data),
    { enabled: false }
  );
};

export default useClassrooms;
