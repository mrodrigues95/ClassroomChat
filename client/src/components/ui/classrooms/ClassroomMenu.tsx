import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { mergeRefs, useLayer } from 'react-laag';
import { useSelect } from 'downshift';
import ResizeObserver from 'resize-observer-polyfill';
import clsx from 'clsx';
import { Classroom, Discussion } from '../../../shared/types';
import getStateReducer from '../utils/getStateReducer';
import useClassrooms from '../../../shared/hooks/data/useClassrooms';
import Spinner from '../Spinner';
import { ErrorIcon, UserAddIcon } from '../../../shared/assets/icons';
import { isClassroom, isDiscussion } from '../../../shared/typeguards';
import ClassroomMenuItems from './ClassroomMenuItems';
import ClassroomMenuItem from './ClassroomMenuItem';

export type Item = Classroom | Discussion;

const ClassroomsMenu = ({ menuButton }: { menuButton: ReactElement }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useClassrooms();
  const focusRef = useRef<HTMLButtonElement>(null);
  const [items, setItems] = useState<Item[] | null>(null);
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
    selectedItem,
  } = useSelect<Item>({
    items: items ?? [],
    onSelectedItemChange: ({ selectedItem }) => {
      if (isClassroom(selectedItem)) {
        setDiscussionsMenu(selectedItem as Classroom);
      } else {
        setClassroomsMenu();
      }
    },
    onIsOpenChange: (changes) => {
      // This ensures that the trigger is focused when the menu
      // is closed via outside click.
      if (
        changes.type === useSelect.stateChangeTypes.MenuBlur &&
        !changes.isOpen
      ) {
        focusRef.current?.focus();
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
    if (!data) return;
    setItems(data.classrooms as Classroom[]);
    setStateReducer(() => getStateReducer('classrooms'));
  };

  // TODO: Handle a classroom that has no discussions.
  // TODO: Handle a user that has no classrooms.
  const setDiscussionsMenu = (selectedClassroom: Classroom) => {
    if (
      !Array.isArray(selectedClassroom.discussions) ||
      !selectedClassroom.discussions.length
    ) {
      console.log("This classroom doesn't have any discussions.");
      return;
    }
    setItems(selectedClassroom.discussions);
    setStateReducer(() => getStateReducer());
  };

  useEffect(() => {
    if (!isOpen) reset();
    if (isOpen && !items) refetch();
  }, [isOpen, reset, refetch, items]);

  useEffect(() => {
    if (data) setItems(data.classrooms);
  }, [data]);

  useEffect(() => {
    if (isDiscussion(selectedItem)) {
      navigate(`/discussion/${selectedItem.id}`);
    }
  }, [selectedItem, navigate]);

  // TODO: Truncate list items.
  return (
    <>
      {React.cloneElement(menuButton, {
        ...triggerProps,
        ...getToggleButtonProps({ ref: mergeRefs(triggerProps.ref, focusRef) }),
      })}
      {renderLayer(
        <AnimatePresence>
          <ClassroomMenuItems
            layerProps={layerProps}
            getMenuProps={getMenuProps}
          >
            {isOpen && (
              <motion.div
                initial={{ x: 40 }}
                animate={{ x: 0 }}
                exit={{ x: 40 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className={clsx(
                  'w-full p-2 rounded-md shadow-lg bg-white border border-gray-200'
                )}
              >
                {isLoading ? (
                  <li className="flex items-center justify-center h-8">
                    <Spinner className="h-5 w-5 mr-2 text-primary-dark" />
                  </li>
                ) : isError ? (
                  <li className="flex items-center h-8">
                    <ErrorIcon className="w-6 h-6 text-red-600 mr-2" />
                    Error loading classrooms.
                  </li>
                ) : items ? (
                  <>
                    {(items as Item[]).map((item: Item, index: number) => (
                      <ClassroomMenuItem
                        item={item}
                        index={index}
                        highlightedIndex={highlightedIndex}
                        getItemProps={getItemProps}
                      >
                        {item.name}
                      </ClassroomMenuItem>
                    ))}
                  </>
                ) : (
                  <li>No classrooms found...</li>
                )}
                {/* <li
                  className="flex w-full px-4 py-2 text-sm leading-5 font-semibold text-green-600 rounded-md text-left cursor-pointer truncate hover:bg-green-500 hover:text-white"
                  {...getItemProps}
                >
                  <UserAddIcon className="inline-block w-5 h-5 mr-2" /> Join a
                  classroom
                </li> */}
              </motion.div>
            )}
          </ClassroomMenuItems>
        </AnimatePresence>
      )}
    </>
  );
};

export default ClassroomsMenu;
