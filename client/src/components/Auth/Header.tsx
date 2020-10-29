import React from 'react';
import NavigationButton from './NavigationButton';

type Props = {
  title: string;
  description: string;
};

const AuthHeader = ({ title, description }: Props) => {
  return (
    <>
      <div className="flex">
        <NavigationButton aria-label="Go back" className="hidden md:inline-flex" />
        <h2 className="flex-1 text-center self-start font-bold text-2xl md:text-3xl">
          {title}
        </h2>
      </div>
      <p className="inline-block mb-10 mt-2 text-gray-700 text-center sm:mt-4 md:mb-16 md:text-lg lg:text-xl">{description}</p>
    </>
  );
};

export default AuthHeader;
