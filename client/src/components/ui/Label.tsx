import React from 'react';

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block w-full text-md text-gray-700 tracking-wide">
      {children}
    </label>
  );
};

export default Label;
