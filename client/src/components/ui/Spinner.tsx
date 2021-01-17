import React from 'react';
import clsx from 'clsx';
import { LoadingIcon } from '../../shared/assets/icons';

const Spinner = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="inline-flex items-center">
      <LoadingIcon
        className={clsx('animate-spin', className ?? 'h-5 w-5 mr-2 text-primary-dark')}
      />
      {children}
    </div>
  );
};

export default Spinner;
