import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: {
    base:
      'bg-white text-black sm:border sm:border-gray-300 focus:bg-gray-200 hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300',
  },
  default: {
    base:
      'border border-transparent bg-primary text-white focus:bg-primary-light hover:bg-primary-light active:bg-primary-dark',
  },
};

type Props = {
  variant?: keyof typeof VARIANTS;
  className?: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'default',
  className,
  fullWidth = false,
  ...props
}: Props) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.default;

  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out',
        variantStyles.base,
        props.disabled && 'cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  );
};

export default Button;
