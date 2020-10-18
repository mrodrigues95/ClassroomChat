import React from 'react';

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block w-full text-sm text-gray-600 tracking-wide">
      {children}
    </label>
  );
};

export default Label;
