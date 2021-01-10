import React from 'react';
import Spinner from './ui/Spinner';

const Loading = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Spinner className="w-6 h-6" />
      <h1 className='font-bold text-xl mt-2'>Loading...</h1>
    </div>
  );
};

export default Loading;
