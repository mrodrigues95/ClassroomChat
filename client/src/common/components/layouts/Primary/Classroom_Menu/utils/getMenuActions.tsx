import React from 'react';
import { MenuAction } from '..';
import { LogoutIcon, PlusCircleIcon } from '../../../../../assets';

const buildClassroomMenuActions = (): MenuAction[] => {
  return [
    {
      name: 'Join a Classroom',
      type: 'join-classroom',
      variant: 'primary',
      icon: <PlusCircleIcon className="inline-block w-5 h-5 mr-2" />,
    },
  ];
};

const buildDiscussionMenuActions = (): MenuAction[] => {
  return [
    {
      name: 'Leave this Classroom',
      type: 'leave-classroom',
      variant: 'danger',
      icon: <LogoutIcon className="inline-block w-5 h-5 mr-2" />,
    },
  ];
};

const getMenuActions = (currentMenu: 'classroom' | 'discussion') => {
  return currentMenu === 'classroom'
    ? buildClassroomMenuActions()
    : buildDiscussionMenuActions();
};

export default getMenuActions;
