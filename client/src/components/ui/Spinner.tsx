import React from 'react';
import { LoadingIcon } from '../../shared/assets/icons';

const Spinner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center">
      <LoadingIcon />
      {children}
    </div>
  );
};

export default Spinner;