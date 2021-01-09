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
import { ErrorIcon } from '../../../shared/assets/icons';
import { isClassroom, isDiscussion } from '../../../shared/typeguards';
import ClassroomMenuItems from './ClassroomMenuItems';
import ClassroomMenuItem, { MenuVariant } from './ClassroomMenuItem';
import getMenuActions from '../utils/getMenuActions';
import { isMenuAction } from './../../../shared/typeguards';

const ClassroomMenuHeader = ({ title }: { title: string }) => {
  return (
    <div className="px-4 py-2 text-sm font-bold border-b mb-2">{title}</div>
  );
};

export type MenuAction = {
  name: string;
  type: 'join-classroom' | 'leave-classroom';
  variant: MenuVariant;
  icon?: ReactElement;
};

export type Item = Classroom | Discussion | MenuAction;

const ClassroomMenu = ({ menuButton }: { menuButton: ReactElement }) => {
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
    setItems([...data.classrooms, ...getMenuActions('classroom')]);
    setStateReducer(() => getStateReducer('classrooms'));
  };

  // TODO: Handle a classroom that has no discussions.
  const setDiscussionsMenu = (selectedClassroom: Classroom) => {
    if (
      !Array.isArray(selectedClassroom.discussions) ||
      !selectedClassroom.discussions.length
    ) {
      console.log("This classroom doesn't have any discussions.");
      return;
    }
    setItems([
      ...selectedClassroom.discussions,
      ...getMenuActions('discussion'),
    ]);
    setStateReducer(() => getStateReducer());
  };

  useEffect(() => {
    if (!isOpen) reset();
    if (isOpen && !items) refetch();
  }, [isOpen, reset, refetch, items]);

  useEffect(() => {
    if (data) {
      setItems([...data.classrooms, ...getMenuActions('classroom')]);
    }
  }, [data]);

  useEffect(() => {
    if (isDiscussion(selectedItem)) {
      navigate(`/discussion/${selectedItem.id}`);
    }
  }, [selectedItem, navigate]);

  // TODO: Truncate list items.
  // TODO: Make menu groups.
  // TODO: Handle a user that has no classrooms.
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
                  'w-full p-2 rounded-md shadow-lg bg-white border border-gray-200 space-y-1'
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
                    <ClassroomMenuHeader
                      title={
                        isClassroom(items[0]) ? 'Classrooms' : 'Discussions'
                      }
                    />
                    {(items as Item[]).map((item: Item, index: number) => (
                      <ClassroomMenuItem
                        key={index}
                        item={item}
                        isHighlighted={highlightedIndex === index}
                        variant={isMenuAction(item) ? item.variant : 'default'}
                        index={index}
                        getItemProps={getItemProps}
                      >
                        {isMenuAction(item) && item.icon}
                        {item.name}
                      </ClassroomMenuItem>
                    ))}
                  </>
                ) : (
                  <li>No classrooms found...</li>
                )}
              </motion.div>
            )}
          </ClassroomMenuItems>
        </AnimatePresence>
      )}
    </>
  );
};

export default ClassroomMenu;
