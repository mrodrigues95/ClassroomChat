import React from 'react';
import clsx from 'clsx';
import {
  HomeIcon,
  MessagesIcon,
  ClassroomsIcon,
  CalenderIcon,
} from '../../shared/assets/icons';
import ProfileInfo from './components/ProfileInfo';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import ActivityFeed from './components/ActivityFeed';
import Logout from './components/Logout';
import ClassroomsMenu from './components/classrooms_menu/ClassroomMenu';

const SidebarContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'w-full p-3 rounded-3xl text-gray-700 font-medium border-gray-300 bg-white shadow-sm lg:mb-8 xl:border',
        className
      )}
    >
      {children}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="md:mr-4 lg:mr-0">
      <div
        className="hidden sticky top-0 max-h-screen h-full flex-col sm:py-3 sm:pl-3 md:flex lg:py-10 lg:pl-10"
        style={{ maxWidth: '21.5rem' }}
      >
        <SidebarContainer className="mb-10 shadow-none px-5 pb-5 pt-2 xl:pt-5 xl:shadow-sm">
          <ProfileInfo />
        </SidebarContainer>
        <SidebarContainer className="border lg:p-5">
          <VerticalNav>
            <VerticalNavItem
              to="/home"
              icon={<HomeIcon className="mx-auto xl:mr-3 xl:ml-0" />}
              label="Home"
              aria-label="Go to home"
            />
            <ClassroomsMenu
              menuButton={
                <VerticalNavItem
                  icon={<ClassroomsIcon className="mx-auto xl:mr-3 xl:ml-0" />}
                  label="Classrooms"
                  aria-label="View classrooms"
                  classroomMenuButton
                />
              }
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
        <SidebarContainer className="hidden lg:p-5 xl:block">
          <ActivityFeed />
        </SidebarContainer>
        <div className="mt-auto">
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
