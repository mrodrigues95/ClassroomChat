import { useQuery } from 'react-query';
import { Classrooms } from '../../shared/types/api';
import { axios } from '../../shared/hooks/auth/useToken';

const get = async () => {
  return await axios.get<Classrooms>('classrooms').then((res) => res.data);
};

const useQueryClassrooms = () => {
  return useQuery<Classrooms, Error>('classrooms', get, {
    enabled: false,
  });
};

export default useQueryClassrooms;
