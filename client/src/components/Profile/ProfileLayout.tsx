import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import 'cropperjs/dist/cropper.css';
import {
  ColourSwatchIcon,
  LockIcon,
  NotificationsIcon,
  PlusCircleIcon,
  ProfileIcon,
} from '../../shared/assets/icons';
import Sidebar from '../Sidebar';
import Avatar from '../ui/Avatar';
import Container, { ContainerBody, ContainerHeader } from '../ui/Container';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import FilePicker, { FileType } from '../ui/FilePicker';
import PhotoCropper from './../ui/PhotoCropper';
import useMutateUploadProfilePhoto from './../../data/mutations/useMutateUploadProfilePhoto';

const CARDVARIANTS = {
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-400',
  salmon: 'bg-red-400',
  black: 'bg-black',
};

type CardProps = {
  to: string;
  icon: ReactElement;
  colour: keyof typeof CARDVARIANTS;
  title: string;
  description: string;
};

const ProfileItemCard = ({
  to,
  icon,
  title,
  colour,
  description,
}: CardProps) => {
  const style = CARDVARIANTS[colour];

  return (
    <Link
      to={to}
      className={clsx(
        'flex p-4 rounded-3xl border border-gray-300 outline-none focus:bg-gray-200 active:bg-gray-300 hover:bg-gray-200 duration-150 ease-in-out'
      )}
    >
      <div className="inline-flex items-center justify-center">
        <div className={clsx('relative w-12 h-12 rounded-full', style)}>
          <span className="absolute inset-0 inline-flex items-center justify-center">
            {icon}
          </span>
        </div>
      </div>
      <div className="flex-1 ml-3">
        <div>
          <span className="font-bold text-md sm:text-xl">{title}</span>
        </div>
        <p className="font-semibold text-sm">{description}</p>
      </div>
    </Link>
  );
};

const ProfileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const focusRef = useRef<HTMLButtonElement>(null);
  const { mutate, isLoading, isError } = useMutateUploadProfilePhoto();

  // TODO: Handle loading/error states.
  // TODO: Close the modal on success.
  // TODO: Refetch profile information on success.
  // TODO: Invalidate sidebar on success.
  const handlePhotoUpload = () => {
    cropper?.getCroppedCanvas().toBlob((blob) => mutate(blob!));
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
            className="font-semibold mr-2 border-none hover:underline focus:underline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button className="font-semibold" onClick={handlePhotoUpload}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      <figure className="flex flex-col items-center justify-center">
        <div className="relative">
          <Avatar
            url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-flex items-center justify-center w-full"
            imgClassName="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
          />
          <FilePicker onFileSelected={handlePhotoSelected}>
            <FilePicker.Button
              className="absolute right-0 bottom-0 mr-1 rounded-full bg-indigo-400 shadow-lg md:mr-4 md:mb-1 lg:mr-6 focus:outline-none"
              aria-label="Select photo"
              aria-describedby="cc-tooltip"
            >
              <PlusCircleIcon className="w-6 h-6 text-white lg:w-8 lg:h-8" />
            </FilePicker.Button>
          </FilePicker>
        </div>
        <figcaption className="mt-5 font-bold text-xl sm:text-3xl">
          John Smith 😀
        </figcaption>
        <span className="text-gray-700 font-medium">johnsmith@gmail.com</span>
      </figure>
    </>
  );
};

const ProfileLayout = () => {
  return (
    <>
      <Sidebar />
      <Container>
        <ContainerHeader title="Profile" />
        <ContainerBody>
          <div className="container flex flex-col mx-auto mt-2 w-full p-2 sm:p-0">
            <ProfileHeader />
            <article className="mt-8">
              <h2 className="font-bold mb-3 text-xl sm:text-3xl">
                Settings ⚙️
              </h2>
              <div className="flex flex-col justify-center space-y-4">
                <ProfileItemCard
                  to="about"
                  icon={<ProfileIcon className="w-6 h-6 text-white" />}
                  colour="salmon"
                  title="About"
                  description="Let others know a little bit about yourself."
                />
                <ProfileItemCard
                  to="notifications"
                  icon={<NotificationsIcon className="w-6 h-6 text-white" />}
                  colour="blue"
                  title="Notifications"
                  description="Manage the way we send you all of the notifications and alerts."
                />
                <ProfileItemCard
                  to="privacy"
                  icon={<LockIcon className="w-6 h-6" />}
                  colour="yellow"
                  title="Privacy"
                  description="Control who can view your information."
                />
                <ProfileItemCard
                  to="appearance"
                  icon={<ColourSwatchIcon className="w-6 h-6 text-white" />}
                  colour="black"
                  title="Appearance"
                  description="Choose how Classroom Chat looks to you."
                />
              </div>
            </article>
          </div>
        </ContainerBody>
      </Container>
    </>
  );
};

export default ProfileLayout;
