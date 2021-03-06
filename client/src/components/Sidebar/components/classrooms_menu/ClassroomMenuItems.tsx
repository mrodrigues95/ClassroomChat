import React from 'react';
import { LayerProps } from 'react-laag';
import { GetPropsCommonOptions, UseSelectGetMenuPropsOptions } from 'downshift';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  layerProps: LayerProps;
  getMenuProps: (
    options?: UseSelectGetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions
  ) => any;
  children: React.ReactNode;
};

const ClassroomMenuItems = ({
  isOpen,
  layerProps,
  getMenuProps,
  children,
}: Props) => {
  return (
    <ul
      className={clsx(
        'w-84 max-h-84 ml-8 outline-none font-medium list-none p-2 rounded-md shadow-lg bg-white border border-gray-200 space-y-1 overflow-y-auto',
        !isOpen && 'hidden'
      )}
      {...layerProps}
      {...getMenuProps({ ref: layerProps.ref })}
    >
      {children}
    </ul>
  );
};

export default ClassroomMenuItems;
