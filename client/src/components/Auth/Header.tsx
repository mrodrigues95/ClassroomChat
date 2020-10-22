import React from 'react';
import { Chevron } from '../../shared/icons';

type Props = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: Props) => {
  return (
    <>
      <div className="flex">
        <button className="flex-grow-0 flex items-center p-3 border border-gray-200 rounded-full focus:outline-none hover:bg-gray-100 active:bg-gray-200 transition duration-150 ease-in-out">
          <Chevron className="h-6 w-6" />
        </button>
        <h2 className="flex-1 text-center self-start font-bold text-2xl">
          {title}
        </h2>
      </div>
      <p className="mx-auto mb-16 text-gray-600 text-center">{description}</p>
    </>
  );
};

export default AuthHeader;
