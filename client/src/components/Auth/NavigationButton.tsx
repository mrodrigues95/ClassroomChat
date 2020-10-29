import React, { ButtonHTMLAttributes } from 'react';
import { Chevron } from '../../shared/assets/icons';
import clsx from 'clsx';

export enum Direction {
  RIGHT,
}

type Props = {
  direction?: Direction;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const NavigationButton = ({ direction, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'flex-grow-0 inline-flex items-center p-3 border border-gray-200 rounded-full focus:outline-none hover:bg-gray-100 hover:border-gray-400 active:border-gray-500 active:bg-gray-200 transition duration-150 ease-in-out',
        className
      )}
      {...props}
    >
      {direction === Direction.RIGHT ? (
        <Chevron className="h-6 w-6 transform rotate-180" />
      ) : (
        <Chevron className="h-6 w-6" />
      )}
    </button>
  );
};

export default NavigationButton;
