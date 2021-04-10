import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { mergeRefs, useLayer } from 'react-laag';
import { useSelect } from 'downshift';
import ResizeObserver from 'resize-observer-polyfill';
import { Classroom, Discussion } from '../../../../types';
import getStateReducer from './utils/getStateReducer';
import getMenuActions from './utils/getMenuActions';
import useQueryClassrooms from '../../../../queries/useQueryClassrooms';
import { Spinner } from '../../../ui';
import { ErrorIcon } from '../../../../assets';
import ClassroomMenuItems from './ClassroomMenuItems';
import ClassroomMenuItem, { MenuItemVariant } from './ClassroomMenuItem';
import { isMenuAction, isClassroom, isDiscussion } from '../../../../typeguards';

const ClassroomMenuHeader = ({ title }: { title: string }) => {
  return <li className="px-4 py-2 text-sm font-bold border-b mb-2">{title}</li>;
};

export type MenuAction = {
  name: string;
  type: 'join-classroom' | 'leave-classroom';
  variant: MenuItemVariant;
  icon?: ReactElement;
};

export type Item = Classroom | Discussion | MenuAction;

const ClassroomMenu = ({ menuButton }: { menuButton: ReactElement }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQueryClassrooms();
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
      router.push(`/discussion/${selectedItem.id}`);
    }
  }, [selectedItem]);

  // TODO: Add menu animations.
  // TODO: Make menu groups.
  // TODO: Handle a user that has no classrooms.
  // TODO: Handle menu actions when selected.
  return (
    <>
      {React.cloneElement(menuButton, {
        ...triggerProps,
        ...getToggleButtonProps({ ref: mergeRefs(triggerProps.ref, focusRef) }),
      })}
      {renderLayer(
        <ClassroomMenuItems
          isOpen={isOpen}
          layerProps={layerProps}
          getMenuProps={getMenuProps}
        >
          {isOpen && (
            <>
              {isLoading ? (
                <li className="flex items-center justify-center h-8">
                  <Spinner />
                </li>
              ) : isError ? (
                <li className="flex items-center h-8">
                  <ErrorIcon className="w-6 h-6 text-red-600 mr-2" />
                  Error loading classrooms.
                </li>
              ) : items ? (
                <>
                  <ClassroomMenuHeader
                    title={isClassroom(items[0]) ? 'Classrooms' : 'Discussions'}
                  />
                  {(items as Item[]).map((item: Item, index: number) => (
                    <ClassroomMenuItem
                      key={item.name}
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
            </>
          )}
        </ClassroomMenuItems>
      )}
    </>
  );
};

export default ClassroomMenu;
