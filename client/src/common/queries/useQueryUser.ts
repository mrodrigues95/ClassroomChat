import { axios } from '../../modules/Auth/hooks/useToken';
import { useQuery, QueryClient } from 'react-query';
import { User } from '../types';

const get = async () => {
  return await axios.get<User>('user').then((res) => res.data);
};

const useQueryPrefetchUser = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery<User, Error>('user', get);
};

const useQueryUser = () => {
  return useQuery<User, Error>('user', get);
};

export { useQueryPrefetchUser, useQueryUser };
