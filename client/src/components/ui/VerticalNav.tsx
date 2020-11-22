import React from 'react';
import clsx from 'clsx';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

type Props = {
  to: string;
  icon: React.ReactElement;
  label: string;
};

export const VerticalNavItem = ({ to, icon, label }: Props) => {
  const location = useLocation();
  const toLocation = useResolvedPath(to);

  const selected = location.pathname === toLocation.pathname;

  return (
    <Link
      to={to}
      className={clsx(
        'w-full flex items-center p-3 rounded-xl cursor-pointer',
        selected ? 'bg-primary text-white' : 'hover:bg-blue-100'
      )}
    >
      {icon}
      <span className="hidden xl:inline-block">{label}</span>
    </Link>
  );
};

const VerticalNav = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col w-full space-y-3">{children}</nav>;
};

export default VerticalNav;
