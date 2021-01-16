import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ChevronIcon } from '../../../shared/assets/icons';
import { Direction } from '../../../shared/types';

type Props = {
  direction?: Direction;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const NavigationButton = ({
  direction = 'left',
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex-grow-0 inline-flex items-center p-3 border border-gray-200 rounded-full focus:outline-none hover:bg-gray-100 hover:border-gray-400 active:border-gray-500 active:bg-gray-200 transition duration-150 ease-in-out',
        className
      )}
      {...props}
    >
      {direction === 'right' ? (
        <ChevronIcon className="h-6 w-6 transform rotate-180" />
      ) : (
        <ChevronIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default NavigationButton;
