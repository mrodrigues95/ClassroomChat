import React, { ReactElement, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayer } from 'react-laag';
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

  // React-laag config.
  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen: isOpen,
    arrowOffset: 4,
    placement: 'right-start',
    ResizeObserver,
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

  return (
    <>
      {React.cloneElement(menuButton, {
        ...triggerProps,
        ...getToggleButtonProps({ ref: triggerProps.ref }),
      })}
      {renderLayer(
        <AnimatePresence>
          <ul
            className={clsx('w-64 ml-8 outline-none font-medium list-none')}
            {...layerProps}
            {...getMenuProps({ ref: layerProps.ref })}
          >
            {isOpen && (
              <motion.div
                initial={{ scale: 0.75 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.75 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className={clsx(
                  'w-full p-2 rounded-md shadow-lg bg-white border border-gray-200'
                )}
              >
                {(items as Item[]).map((item: Item, index: number) => (
                  <li
                    className={clsx(
                      'block w-full px-4 py-2 text-sm leading-5 text-black rounded-md text-left cursor-pointer truncate',
                      highlightedIndex === index && 'bg-blue-100'
                    )}
                    key={index}
                    {...getItemProps({ item: item, index })}
                  >
                    {item.name}
                  </li>
                ))}
              </motion.div>
            )}
          </ul>
        </AnimatePresence>
      )}
    </>
  );
};

export default ClassroomsMenu;
