import { useQuery } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Profile } from '../../shared/types/api';

const getProfile = async () => {
  return await axios.get<Profile>('profile').then((res) => res.data);
};

const useQueryProfile = () => {
  return useQuery<Profile, Error>('profile', getProfile);
};

export default useQueryProfile;
