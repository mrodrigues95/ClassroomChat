import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const VARIANTS = {
  default: {
    base:
      'w-full flex items-center p-3 rounded-xl font-semibold cursor-pointer focus:outline-none transition duration-150 ease-out',
    selected:
      'bg-primary-default text-white focus:bg-primary-light hover:bg-primary-light active:bg-primary-dark',
    other:
      'text-gray-700 focus:bg-gray-200 focus:text-gray-900 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300',
  },
};

type Props = {
  children: ReactNode;
  to?: string;
  selected?: boolean;
  className?: string;
} & HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

const LinkOrButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, to, selected = false, className, ...props }, ref) => {
    const variantStyles = VARIANTS.default;

    // Allow the caller to define their own custom styling if needed.
    let styles = '';
    if (className) {
      styles = className;
    } else {
      styles = variantStyles.base;
    }

    if (to) {
      return (
        <Link href={to}>
          <a
            className={clsx(
              styles,
              selected ? variantStyles.selected : variantStyles.other
            )}
            {...props}
          >
            {children}
          </a>
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={clsx(
          styles,
          selected ? variantStyles.selected : variantStyles.other
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default LinkOrButton;
