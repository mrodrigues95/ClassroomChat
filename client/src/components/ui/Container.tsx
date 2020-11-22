import React from 'react';
import { NotificationsIcon, SearchIcon } from '../../shared/assets/icons';
import Button from './Button';
import Input from './Input';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export const ContainerBody = ({ children }: Props) => {
  return <section className="flex-1">{children}</section>;
};

export const ContainerHeader = ({ title, children }: Props) => {
  return (
    <section className="flex flex-col justify-between mb-3 lg:mb-6">
      <div className="flex items-center justify-between mb-2">
        {title && <h1 className="font-bold text-4xl">{title}</h1>}
        <div className="relative flex items-center w-2/5">
          <span className="absolute left-0 inset-y-0 flex items-center pl-4">
            <SearchIcon className="h-5 w-5" />
          </span>
          <Input placeholder="Search" />
          <Button
            variant="primary"
            className="rounded-full ml-3"
            aria-label="View notifications"
          >
            <NotificationsIcon />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">{children}</div>
    </section>
  );
};

const Container = ({ children }: Props) => {
  return <main className="flex flex-col flex-1 w-full pl-4 lg:pl-8 xl:pl-12">{children}</main>;
};

export default Container;
