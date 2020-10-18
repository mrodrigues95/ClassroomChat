import React from 'react';
import { ChevronLeft } from './../../shared/hooks/useIcon';

type Props = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: Props) => {
  return (
    <>
      <div className="flex">
        <span className="flex-grow-0 p-3 border border-gray-200 rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </span>
        <h2 className="flex-1 text-center self-start font-bold text-2xl">
          {title}
        </h2>
      </div>
      <p className="mx-auto mb-16 text-gray-600 text-center">{description}</p>
    </>
  );
};

export default AuthHeader;
