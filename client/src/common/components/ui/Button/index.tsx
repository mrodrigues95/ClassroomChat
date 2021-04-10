import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: {
    base: 'text-black sm:border sm:border-gray-300',
    active:
      'focus:bg-gray-200 hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300',
    disabled: 'opacity-50',
  },
  default: {
    base: 'border border-transparent text-white bg-primary',
    active:
      'focus:bg-primary-light hover:bg-primary-light active:bg-primary-dark',
    disabled: 'opacity-50',
  },
};

type Props = {
  variant?: keyof typeof VARIANTS;
  className?: string;
  fullWidth?: boolean;
  defaultPadding?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'default',
  className,
  fullWidth = false,
  defaultPadding = true,
  ...props
}: Props) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.default;

  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex items-center justify-center rounded-md transition duration-150 ease-in-out focus:outline-none',
        variantStyles.base,
        props.disabled && 'cursor-not-allowed',
        props.disabled ? variantStyles.disabled : variantStyles.active,
        fullWidth && 'w-full',
        defaultPadding && 'px-4 py-2',
        className
      )}
      {...props}
    />
  );
};

export default Button;
