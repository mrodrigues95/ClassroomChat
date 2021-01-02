import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useLocation, useResolvedPath } from 'react-router-dom';
import LinkOrButton from './LinkOrButton';

type Props = {
  to?: string;
  icon: React.ReactElement;
  label: string;
} & HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>;

export const VerticalNavItem = forwardRef<HTMLButtonElement, Props>(
  ({ to, icon, label, ...props }, ref) => {
    const location = useLocation();
    const toLocation = useResolvedPath(to || '/_');

    const selected = location.pathname === toLocation.pathname;

    return (
      <LinkOrButton
        to={to}
        className={clsx(
          'w-full flex items-center p-3 rounded-xl font-semibold cursor-pointer focus:outline-none transition duration-150 ease-out',
          selected
            ? 'bg-primary text-white'
            : 'text-gray-700 focus:bg-gray-200 focus:text-gray-900 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300'
        )}
        ref={ref}
        {...props}
      >
        <span className={clsx(selected ? 'text-white' : 'text-gray-900')}>
          {icon}
        </span>
        <span className="hidden xl:inline-block">{label}</span>
      </LinkOrButton>
    );
  }
);

const VerticalNav = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col w-full space-y-3">{children}</nav>;
};

export default VerticalNav;
