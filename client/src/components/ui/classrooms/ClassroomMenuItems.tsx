import React from 'react';
import { LayerProps } from 'react-laag';
import { GetPropsCommonOptions, UseSelectGetMenuPropsOptions } from 'downshift';

type Props = {
  layerProps: LayerProps;
  getMenuProps: (
    options?: UseSelectGetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions
  ) => any;
  children: React.ReactNode;
};

const ClassroomMenuItems = ({ layerProps, getMenuProps, children }: Props) => {
  return (
    <ul
      className="w-64 ml-8 outline-none font-medium list-none"
      {...layerProps}
      {...getMenuProps({ ref: layerProps.ref })}
    >
      {children}
    </ul>
  );
};

export default ClassroomMenuItems;
