import React from 'react';
import clsx from 'clsx';

type Props = {
  url: string;
  className?: string;
  imgClassName?: string;
};

const Avatar = ({ url, className, imgClassName, ...props }: Props) => {
  return (
    <div className={clsx('flex-shrink-0', className)}>
      <img
        className={clsx('h-10 w-10 rounded-full bg-cover', imgClassName)}
        src={url}
        alt="User Avatar"
        {...props}
      />
    </div>
  );
};

export default Avatar;
