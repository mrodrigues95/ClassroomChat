import { useQuery } from 'react-query';
import { Classrooms } from '../../shared/types/api';
import { axios } from '../../shared/hooks/auth/useToken';

const getClassrooms = async () => {
  return await axios.get<Classrooms>('classroom/list').then((res) => res.data);
};

const useQueryClassrooms = () => {
  return useQuery<Classrooms, Error>('classrooms', getClassrooms, {
    enabled: false,
  });
};

export default useQueryClassrooms;
