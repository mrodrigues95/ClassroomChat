import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Photo } from '../../shared/types/api';

type Request = Blob;

const upload = async (photo: Request) => {
  const formData = new FormData();
  formData.append('File', photo);

  return await axios
    .post<Photo>('photo/avatar', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

const useMutateUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation(upload, {
    onSuccess: () => {
      queryClient.invalidateQueries('userAvatar');
    },
  });
};

export default useMutateUploadAvatar;
