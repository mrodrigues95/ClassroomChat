import React from 'react';
import NavigationButton from '../../ui/NavigationButton';
import Avatar from '../../ui/Avatar';

const ProfileInfo = () => {
  return (
    <div className="flex items-center">
      <Avatar
        url="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="md:mx-auto xl:mr-3"
        imgClassName="h-12 w-12"
      />
      <div className="hidden xl:flex items-center flex-1 justify-between">
        <div>
          <p className="font-bold text-black">John Smith</p>
          <p className="text-sm text-gray-700 font-medium">
            johnsmith@gmail.com
          </p>
        </div>
        <NavigationButton
          to="/profile"
          direction="right"
          size="medium"
          aria-label="Go to profile"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
