import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

type Props = {
  to: string;
  icon?: React.ReactElement;
  label: string;
  cb?: Function;
};

// TODO: Create a getIcon() util and pass it the selected state and icon type.
export const VerticalNavItem = ({ to, icon, label, cb }: Props) => {
  const location = useLocation();
  const toLocation = useResolvedPath(to);

  const selected = location.pathname === toLocation.pathname;

  useEffect(() => {
    if (selected && cb) {
      cb(to);
    }
  }, [selected, to, cb]);

  return (
    <Link
      to={to}
      className={clsx(
        'w-full flex items-center p-3 rounded-2xl cursor-pointer',
        selected ? 'bg-primary text-white' : 'hover:bg-blue-100'
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const VerticalNav = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col w-full space-y-3">{children}</nav>;
};

export default VerticalNav;
