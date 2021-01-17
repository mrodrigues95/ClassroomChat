import React from 'react';
import { FeelingBlueIllustration } from '../../shared/assets/illustrations';
import LinkOrButton from './LinkOrButton';

// TODO: These button styles should be moved to the LinkOrButton component.
const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col h-full p-4 items-center justify-center">
      <FeelingBlueIllustration className="w-full h-64" />
      <h2 className="my-6 font-bold text-2xl text-center">{message}</h2>
      <LinkOrButton
        to="/home"
        className="inline-flex justify-center items-center p-3 bg-primary text-white rounded-md font-semibold cursor-pointer transition duration-150 ease-out sm:w-48 focus:outline-none focus:bg-primary-light hover:bg-primary-light active:bg-primary-dark"
      >
        Go home
      </LinkOrButton>
    </div>
  );
};

export default Error;
