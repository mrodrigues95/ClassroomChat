import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
};

const VARIANTS = {
  primary: {
    base: 'border border-gray-300 bg-white text-black hover:bg-gray-100 active:bg-gray-200'
  },
  default: {
    base:
      'border border-transparent bg-primary text-white hover:bg-primary-lighter active:bg-primary-dark',
  },
};

const Button = ({ variant = 'default', ...props }: Props) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.default;

  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex justify-center w-full p-4 rounded-2xl font-bold focus:outline-none transition duration-150 ease-in-out',
        variantStyles.base
      )}
      {...props}
    />
  );
};

export default Button;
