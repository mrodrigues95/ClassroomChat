import { useQuery } from 'react-query';
import { Classroom } from '../../types';
import { axios } from './../auth/useToken';

export type GetClassroomsResponse = {
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
