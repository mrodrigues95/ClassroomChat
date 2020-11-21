import React, { useState } from 'react';
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

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-5 mb-8 rounded-3xl text-gray-700 font-medium border border-gray-300 bg-white">
      {children}
    </div>
  );
};

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const changeIconColour = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  return (
    <aside className="sticky flex flex-col max-w-xs">
      <SidebarContainer>
        <ProfileInfo />
      </SidebarContainer>
      <SidebarContainer>
        <VerticalNav>
          <VerticalNavItem
            to="/home"
            icon={
              <HomeIcon
                className={clsx(
                  'mr-3',
                  selectedItem === '/home' && 'text-white'
                )}
              />
            }
            label="Home"
            cb={changeIconColour}
          />
          <VerticalNavItem
            to="/messages"
            icon={
              <MessagesIcon
                className={clsx(
                  'mr-3',
                  selectedItem === '/messages' && 'text-white'
                )}
              />
            }
            label="Messages"
            cb={changeIconColour}
          />
          <VerticalNavItem
            to="/classrooms"
            icon={
              <ClassroomsIcon
                className={clsx(
                  'mr-3',
                  selectedItem === '/classrooms' && 'text-white'
                )}
              />
            }
            label="Classrooms"
            cb={changeIconColour}
          />
          <VerticalNavItem
            to="/calender"
            icon={
              <CalenderIcon
                className={clsx(
                  'mr-3',
                  selectedItem === '/calender' && 'text-white'
                )}
              />
            }
            label="Calender"
            cb={changeIconColour}
          />
        </VerticalNav>
      </SidebarContainer>
      <SidebarContainer>
        <ActivityFeed />
      </SidebarContainer>
      <div className="mt-auto">
        <Logout />
      </div>
    </aside>
  );
};

export default Sidebar;
