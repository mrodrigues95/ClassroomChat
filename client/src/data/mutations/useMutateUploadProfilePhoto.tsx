import { useMutation } from 'react-query';
import { axios } from '../../shared/hooks/auth/useToken';
import { Photo } from '../../shared/types/api';

type Request = Blob;

const upload = async (photo: Request) => {
  const formData = new FormData();
  formData.append('File', photo);

  return await axios
    .post<Photo>('photo/profile', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

// TODO: Invalidate the profile's query when it's implemented so that
// when a new profile photo is uploaded, the sidebar is refetched.
const useMutateUploadProfilePhoto = () => {
  return useMutation<Photo, Error, Blob, Error>(upload);
};

export default useMutateUploadProfilePhoto;
