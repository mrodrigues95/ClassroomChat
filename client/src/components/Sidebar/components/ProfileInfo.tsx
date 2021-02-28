import React from 'react';
import NavigationButton from '../../ui/NavigationButton';
import Avatar from '../../ui/Avatar';
import useQueryProfile from '../../../data/queries/useQueryProfile';
import Spinner from '../../ui/Spinner';

const ProfileInfo = () => {
  const { data, isLoading, isError } = useQueryProfile();

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        'Something went wrong...'
      ) : (
        <>
          <Avatar
            url={
              data?.imageUrl ??
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
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
