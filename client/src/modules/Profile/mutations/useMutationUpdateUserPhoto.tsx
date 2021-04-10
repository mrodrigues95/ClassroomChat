import { useMutation, useQueryClient } from 'react-query';
import { Photo } from '../../../common/types';
import { axios } from '../../Auth/hooks/useToken';

type Request = Blob;

const update = async (photo: Request) => {
  const formData = new FormData();
  formData.append('File', photo);

  return await axios
    .put<Photo>('user/photo/update', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

const useMutationUpdateUserPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
};

export default useMutationUpdateUserPhoto;
