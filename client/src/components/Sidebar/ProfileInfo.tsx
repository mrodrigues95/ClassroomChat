import React from 'react';
import { ChevronIcon } from '../../shared/assets/icons';

const ProfileInfo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 rounded-full bg-cover"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex items-center flex-1 justify-between">
        <div>
          <p className="font-bold text-black">John Smith</p>
          <p className="text-sm text-gray-700 font-medium">
            johnsmith@gmail.com
          </p>
        </div>
        <button
          type="button"
          className="mt-auto p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 focus:outline-none transition duration-150 ease-in-out"
          aria-label="Go to profile"
        >
          <ChevronIcon
            className="h-5 w-5 transform rotate-180"
            aria-hidden={true}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
