import React from 'react';
import {
  NotificationsIcon,
  HamburgerMenuIcon,
} from '../../shared/assets/icons';
import Button from './Button';
import Search from './Search';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export const ContainerBody = ({ children }: Props) => {
  return <section className="relative flex-1">{children}</section>;
};

export const ContainerHeader = ({ title, children }: Props) => {
  return (
    <section className="flex flex-col justify-between border-b border-gray-200 p-3 sm:border-none sm:p-0 sm:mb-3 lg:mb-6">
      <div className="flex items-center justify-between sm:mb-2">
        <Button
          variant="primary"
          className="inline-flex rounded-full mr-1 sm:hidden"
          aria-label="Open menu"
        >
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
        {title && <h1 className="font-bold truncate sm:text-4xl">{title}</h1>}
        <div className="flex justify-end items-center w-3/5">
          <Search placeholder="Search" />
          <Button
            variant="primary"
            className="rounded-full p-2 sm:p-3 sm:ml-3"
            aria-label="View notifications"
          >
            <NotificationsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">{children}</div>
    </section>
  );
};

const Container = ({ children }: Props) => {
  return <main className="flex flex-col flex-1 w-full">{children}</main>;
};

export default Container;
