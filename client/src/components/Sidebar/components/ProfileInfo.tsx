import React from 'react';
import NavigationButton from '../../ui/NavigationButton';
import Avatar from '../../ui/Avatar';
import useQueryUser from '../../../data/queries/useQueryUser';
import Spinner from '../../ui/Spinner';
import { getRandomAvatar } from './../../../shared/utils/getRandomAvatar';

const ProfileInfo = () => {
  const { data, isLoading, isError } = useQueryUser();

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <span className="font-semibold">
          Cannot load profile info at this time.
        </span>
      ) : (
        <>
          <Avatar
            url={data?.imageUrl ?? getRandomAvatar()}
            className="xl:mr-3"
            imgClassName="h-12 w-12"
          />
          <div className="hidden w-full xl:flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-black">{data?.name}</p>
              <p className="text-sm text-gray-700 font-medium truncate">
                {data?.email}
              </p>
            </div>
            <NavigationButton
              to="/profile"
              direction="right"
              size="medium"
              aria-label="Go to profile"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
