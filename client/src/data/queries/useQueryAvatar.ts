import { useQuery } from 'react-query';
import { Photo } from '../../shared/types/api';
import { axios } from '../../shared/hooks/auth/useToken';

const getPhoto = async () => {
  return await axios.get<Photo>('photo/avatar').then((res) => res.data);
};

const useQueryUserPhoto = () => {
  return useQuery<Photo, Error>('userAvatar', getPhoto);
};

export default useQueryUserPhoto;
