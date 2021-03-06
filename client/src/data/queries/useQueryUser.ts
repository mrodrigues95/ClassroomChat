import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { User } from '../../shared/types/api';

const get = async () => {
  return await axios.get<User>('user').then((res) => res.data);
};

const useQueryUser = () => {
  return useQuery<User, Error>('user', get);
};

export default useQueryUser;
