import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Photo } from '../../shared/types/api';

type Request = Blob;

const update = async (photo: Request) => {
  const formData = new FormData();
  formData.append('File', photo);

  return await axios
    .put<Photo>('profile/photo', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

const useMutationUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });
};

export default useMutationUpdateProfilePhoto;
