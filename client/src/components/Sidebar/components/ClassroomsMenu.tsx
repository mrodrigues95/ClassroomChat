import React, { ReactElement, useEffect, useState } from 'react';
import { Arrow, useLayer } from 'react-laag';
import { useSelect } from 'downshift';
import ResizeObserver from 'resize-observer-polyfill';
import clsx from 'clsx';
import { Classroom, Discussion } from '../../../shared/types';
import getStateReducer from './../../ui/utils/getStateReducer';

const classrooms: Classroom[] = [
  { id: 1, name: 'C#', discussionsCount: 1 },
  { id: 2, name: 'F#', discussionsCount: 2 },
  { id: 3, name: 'Networking', discussionsCount: 2 },
];

const discussions: Discussion[] = [
  { id: 1, classroomId: 1, name: 'Test One' },
  { id: 2, classroomId: 2, name: 'Test Two' },
  { id: 3, classroomId: 3, name: 'Test Three' },
];

export type Item = Classroom | Discussion;

const ClassroomsMenu = ({ menuButton }: { menuButton: ReactElement }) => {
  const [items, setItems] = useState<Item[]>(classrooms);
  const [stateReducer, setStateReducer] = useState(() =>
    getStateReducer('classrooms')
  );

  // Downshift config.
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useSelect<Item>({
    items: items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem?.hasOwnProperty('discussionsCount')) {
        setDiscussionsMenu();
      } else {
        setClassroomsMenu();
      }
    },
    stateReducer: stateReducer,
  });

  const setClassroomsMenu = () => {
    setItems(classrooms);
    setStateReducer(() => getStateReducer('classrooms'));
  };

  const setDiscussionsMenu = () => {
    setItems(discussions);
    setStateReducer(() => getStateReducer());
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  // React-laag config.
  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen: isOpen,
    arrowOffset: 4,
    placement: 'right-center',
    ResizeObserver,
  });

  return (
    <>
      {React.cloneElement(menuButton, {
        ...triggerProps,
        ...getToggleButtonProps({ ref: triggerProps.ref }),
      })}
      {renderLayer(
        <ul
          className={clsx(
            'p-2 w-64 ml-8 bg-white font-medium border border-gray-200 rounded-md shadow-lg outline-none list-none',
            isOpen ? 'block' : 'hidden'
          )}
          {...layerProps}
          {...getMenuProps({ ref: layerProps.ref })}
        >
          {isOpen && (
            <>
              {(items as Item[]).map((item: Item, index: number) => (
                <li
                  className={clsx(
                    'block w-full px-4 py-2 text-sm leading-5 rounded-md text-left cursor-pointer truncate',
                    highlightedIndex === index
                      ? 'bg-blue-100 text-gray-900'
                      : 'text-gray-700'
                  )}
                  key={index}
                  {...getItemProps({ item: item, index })}
                >
                  {item.name}
                </li>
              ))}
            </>
          )}
          <Arrow {...arrowProps} />
        </ul>
      )}
    </>
  );
};

export default ClassroomsMenu;
