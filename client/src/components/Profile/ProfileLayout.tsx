import clsx from 'clsx';
import React, { ReactElement } from 'react';
import {
  ColourSwatchIcon,
  LockIcon,
  NotificationsIcon,
  ProfileIcon,
} from '../../shared/assets/icons';
import Sidebar from '../Sidebar';
import Avatar from '../ui/Avatar';
import Container, { ContainerBody, ContainerHeader } from '../ui/Container';

const VARIANTS = {
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-400',
  salmon: 'bg-red-400',
  black: 'bg-black',
};

type Props = {
  icon: ReactElement;
  colour: keyof typeof VARIANTS;
  title: string;
  description: string;
};

const ProfileItemCard = ({ icon, title, colour, description }: Props) => {
  const style = VARIANTS[colour];

  return (
    <div
      className={clsx(
        'flex p-4 border border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-100 duration-150 ease-in-out'
      )}
    >
      <div className="inline-flex items-center justify-center">
        <div className={clsx('relative w-12 h-12 rounded-full', style)}>
          <span className="absolute inset-0 inline-flex items-center justify-center">
            {icon}
          </span>
        </div>
      </div>
      <div className="flex-1 ml-2">
        <div>
          <span className="font-bold text-md sm:text-xl">{title}</span>
        </div>
        <p className="font-semibold text-sm">{description}</p>
      </div>
    </div>
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
            <figure className="flex flex-col items-center justify-center">
              <Avatar
                url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-flex items-center justify-center w-full"
                imgClassName="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
              />
              <figcaption className="mt-5 font-bold text-xl sm:text-3xl">
                John Smith 😀
              </figcaption>
              <span className="text-gray-700 font-medium">
                johnsmith@gmail.com
              </span>
            </figure>
            <article className="mt-8">
              <h2 className="font-bold mb-3 text-xl sm:text-3xl">
                Settings ⚙️
              </h2>
              <div className="flex flex-col justify-center space-y-4">
                <ProfileItemCard
                  icon={<ProfileIcon className="w-6 h-6 text-white" />}
                  colour="salmon"
                  title="Profile"
                  description="Let others know a little bit about yourself."
                />
                <ProfileItemCard
                  icon={<NotificationsIcon className="w-6 h-6 text-white" />}
                  colour="blue"
                  title="Notifications"
                  description="Manage the way we send you all of the notifications and alerts."
                />
                <ProfileItemCard
                  icon={<LockIcon className="w-6 h-6" />}
                  colour="yellow"
                  title="Privacy"
                  description="Control who can view your information."
                />
                <ProfileItemCard
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
