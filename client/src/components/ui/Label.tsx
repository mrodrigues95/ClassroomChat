import React from 'react';
import clsx from 'clsx';

type Props = {
  error?: string | undefined;
  children: React.ReactNode;
};

const Label = ({ error, children }: Props) => {
  return (
    <label
      className={clsx(
        'block w-full text-md text-gray-700 tracking-wide',
        typeof error !== 'undefined' && 'font-bold uppercase text-red-600'
      )}
    >
      {children}
    </label>
  );
};

export default Label;
