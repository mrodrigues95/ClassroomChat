import { useQuery } from 'react-query';
import { axios } from '../../modules/Auth/hooks/useToken';
import { Classrooms } from '../types';

const get = async () => {
  return await axios.get<Classrooms>('classrooms').then((res) => res.data);
};

const useQueryClassrooms = () => {
  return useQuery<Classrooms, Error>('classrooms', get, {
    enabled: false,
  });
};

export default useQueryClassrooms;
