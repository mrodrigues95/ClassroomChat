import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import {
  FileType,
  Modal,
  PhotoCropper,
  Button,
  Spinner,
  Avatar,
  FilePicker,
} from '../../common/components';
import { User } from '../../common/types';
import { getRandomAvatar } from '../../common/utils/getRandomAvatar';
import useMutationUpdateUserPhoto from './mutations/useMutationUpdateUserPhoto';
import { PlusCircleIcon } from '../../common/assets/icons';

const ProfileHeader = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const focusRef = useRef<HTMLButtonElement>(null);
  const mutation = useMutationUpdateUserPhoto();

  const handlePhotoUpload = () => {
    cropper?.getCroppedCanvas().toBlob((blob) => mutation.mutate(blob!));
  };

  const handlePhotoSelected = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (mutation.isSuccess) {
      setIsOpen(false);
      mutation.reset();
    } else if (mutation.isError) {
      toast.error('Something went wrong.');
      mutation.reset();
    }
  }, [mutation]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview!));
    };
  }, [files]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialFocus={focusRef}
        title="Edit Photo"
        description="Use the cropper below to edit your new profile photo."
      >
        <Modal.Content>
          {files.length > 0 && (
            <PhotoCropper
              image={files[0].preview!}
              setCropper={setCropper}
              className="h-full max-w-md mx-auto"
            />
          )}
        </Modal.Content>
        <Modal.Footer>
          <Button
            variant="primary"
            className={clsx(
              'font-semibold mr-2 border-none',
              mutation.isLoading
                ? 'hover:no-underline focus:no-underline'
                : 'hover:underline focus:underline'
            )}
            onClick={() => setIsOpen(false)}
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            className="font-semibold w-16 h-10"
            onClick={handlePhotoUpload}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <Spinner className="h-4 w-4 text-white" />
            ) : (
              'Apply'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <figure className="flex flex-col items-center justify-center">
        <div className="relative">
          <Avatar
            url={user?.imageUrl ?? getRandomAvatar()}
            className="inline-flex items-center justify-center w-full"
            imgClassName="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
          />
          <FilePicker onFileSelected={handlePhotoSelected}>
            <FilePicker.Button
              className="absolute right-0 bottom-0 mr-1 rounded-full bg-indigo-400 shadow-lg md:mr-4 md:mb-1 lg:mr-6 focus:outline-none"
              aria-label="Select photo"
            >
              <PlusCircleIcon className="w-6 h-6 text-white lg:w-8 lg:h-8" />
            </FilePicker.Button>
          </FilePicker>
        </div>
        <figcaption className="mt-5 font-bold text-xl sm:text-3xl">
          {user?.name} 😀
        </figcaption>
        <span className="text-gray-700 font-medium">{user?.email}</span>
      </figure>
    </>
  );
};

export default ProfileHeader;
