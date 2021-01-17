import React from 'react';
import { Link } from 'react-router-dom';
import { VoidIllustration } from './../../shared/assets/illustrations';

const FourOhFour = () => {
  return (
    <div className="flex flex-1 items-center justify-center sm:mb-96">
      <div className="flex flex-col items-center justify-center lg:ml-48">
        <h1 className="font-bold text-9xl">404</h1>
        <h2 className="-mt-8 mb-12 font-semibold text-xl">Page not found</h2>
        <Link
          to="/home"
          className="py-4 px-6 font-semibold rounded-full text-white bg-pink-600 focus:bg-pink-500 hover:bg-pink-500 transition ease-in-out duration-150"
        >
          Go back home
        </Link>
      </div>
      <div className="hidden flex-1 ml-32 lg:block">
        <VoidIllustration className="h-96" />
      </div>
    </div>
  );
};

export default FourOhFour;
