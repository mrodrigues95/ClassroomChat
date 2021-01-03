import React from 'react';
import clsx from 'clsx';
import { UseSelectGetItemPropsOptions } from 'downshift';
import { Item } from './ClassroomMenu';

type Props = {
  className?: string;
  item: Item;
  getItemProps: (options: UseSelectGetItemPropsOptions<Item>) => any;
  index: number;
  highlightedIndex: number;
  children: React.ReactNode;
};

const ClassroomMenuItem = ({
  className,
  item,
  getItemProps,
  index,
  highlightedIndex,
  children,
}: Props) => {
  return (
    <li
      key={index}
      className={clsx(
        className ??
          'flex w-full px-4 py-2 text-sm font-semibold leading-5 text-gray-700 rounded-md text-left cursor-pointer truncate',
        highlightedIndex === index && 'text-gray-900 bg-gray-200'
      )}
      {...getItemProps({ item: item, index })}
    >
      {children}
    </li>
  );
};

export default ClassroomMenuItem;
