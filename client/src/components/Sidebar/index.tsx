import React from 'react';
import clsx from 'clsx';
import {
  HomeIcon,
  MessagesIcon,
  ClassroomsIcon,
  CalenderIcon,
} from '../../shared/assets/icons';
import ProfileInfo from './ProfileInfo';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import ActivityFeed from './ActivityFeed';
import Logout from './Logout';

const SidebarContainer = ({
  className,
  navigation,
  children,
}: {
  className?: string;
  navigation?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'w-full p-3 rounded-3xl text-gray-700 font-medium lg:p-5 lg:mb-8 xl:border border-gray-300 bg-white',
        navigation && 'border',
        className
      )}
    >
      {children}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden sticky md:flex flex-col max-w-xs">
      <SidebarContainer className="mt-2 mb-10">
        <ProfileInfo />
      </SidebarContainer>
      <SidebarContainer navigation>
        <VerticalNav>
          <VerticalNavItem
            to="/home"
            icon={<HomeIcon className="mx-auto xl:mr-3 xl:ml-0" />}
            label="Home"
            aria-label="Go to home"
          />
          <VerticalNavItem
            to="/classrooms"
            icon={<ClassroomsIcon className="mx-auto xl:mr-3 xl:ml-0" />}
            label="Classrooms"
            aria-label="View classrooms"
          />
          <VerticalNavItem
            to="/messages"
            icon={<MessagesIcon className="mx-auto xl:mr-3 xl:ml-0" />}
            label="Messages"
            aria-label="Go to messages"
          />
          <VerticalNavItem
            to="/calender"
            icon={<CalenderIcon className="mx-auto xl:mr-3 xl:ml-0" />}
            label="Calender"
            aria-label="Go to calender"
          />
        </VerticalNav>
      </SidebarContainer>
      <SidebarContainer className="hidden xl:block">
        <ActivityFeed />
      </SidebarContainer>
      <div className="mt-auto">
        <Logout />
      </div>
    </aside>
  );
};

export default Sidebar;
