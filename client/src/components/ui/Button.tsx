import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: {
    base:
      'border border-gray-300 bg-white text-black hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200',
  },
  default: {
    base:
      'border border-transparent bg-primary text-white hover:bg-primary-light active:bg-primary-dark',
  },
};

type Props = {
  variant?: keyof typeof VARIANTS;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = 'default', className, ...props }: Props) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.default;

  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex items-center justify-center w-full p-4 rounded-2xl font-bold focus:outline-none transition duration-150 ease-in-out',
        variantStyles.base,
        props.disabled && 'cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
};

export default Button;
