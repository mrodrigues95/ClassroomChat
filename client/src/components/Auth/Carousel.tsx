import React from 'react';
import NavigationButton from './NavigationButton';
import { Collaboration } from './../../shared/assets/illustrations';

const Carousel = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>
        <Collaboration className="w-8/12 mx-auto" />
      </div>
      <div className="flex flex-col flex-1 -mt-16 w-full">
        <h2 className="text-center self-center font-bold text-3xl">
          Connect With Classmates
        </h2>
        <p className="mt-2 text-center text-gray-700 text-xl">
          You can easily connect with classmates using our platform.
        </p>
        <div className="flex justify-center w-full mt-24 space-x-3">
          <span className="rounded-full h-2 w-2 bg-gray-300" />
          <span className="rounded-full h-2 w-5 bg-blue-400" />
          <span className="rounded-full h-2 w-2 bg-gray-300" />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <NavigationButton />
        <span className="pl-6" />
        <NavigationButton direction="forward" />
      </div>
    </div>
  );
};

export default Carousel;
