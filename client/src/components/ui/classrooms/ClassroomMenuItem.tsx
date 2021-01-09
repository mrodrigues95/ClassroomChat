import React from 'react';
import clsx from 'clsx';
import { UseSelectGetItemPropsOptions } from 'downshift';
import { Item } from './ClassroomMenu';

const VARIANTS = {
  primary: {
    active: 'text-white bg-green-500',
    inactive: 'text-green-600',
  },
  danger: {
    active: 'text-white bg-red-600',
    inactive: 'text-red-600',
  },
  default: {
    active: 'text-gray-900 bg-gray-200',
    inactive: 'text-gray-700',
  },
};

export type MenuVariant = keyof typeof VARIANTS;

type Props = {
  item: Item;
  index: number;
  getItemProps: (options: UseSelectGetItemPropsOptions<Item>) => any;
  isHighlighted: boolean;
  variant: MenuVariant;
  children: React.ReactNode;
};

const ClassroomMenuItem = ({
  item,
  index,
  getItemProps,
  isHighlighted,
  variant,
  children,
  ...props
}: Props) => {
  const variantStyles = VARIANTS[variant];

  return (
    <li
      className={clsx(
        'flex w-full px-4 py-2 text-sm font-semibold leading-5 rounded-md text-left cursor-pointer truncate',
        isHighlighted ? variantStyles.active : variantStyles.inactive
      )}
      {...getItemProps({ item: item, index })}
      {...props}
    >
      {children}
    </li>
  );
};

export default ClassroomMenuItem;
