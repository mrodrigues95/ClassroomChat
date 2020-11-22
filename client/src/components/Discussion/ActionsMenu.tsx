import React from 'react';
import {
  AttachmentsIcon,
  CalenderIcon,
  SettingsIcon,
} from '../../shared/assets/icons';
import Button from '../ui/Button';

const ActionsMenu = () => {
  return (
    <div className="flex items-center">
      <Button
        variant="primary"
        className="ml-2 rounded-sm px-2 py-2 border-none"
        aria-label="View dicussion calender"
      >
        <CalenderIcon className="h-8 w-8" />
      </Button>
      <Button
        variant="primary"
        className="ml-2 rounded-sm px-2 py-2 border-none"
        aria-label="View discussion attachments"
      >
        <AttachmentsIcon className="h-8 w-8" />
      </Button>
      <Button
        variant="primary"
        className="ml-2 rounded-sm px-2 py-2 border-none"
        aria-label="View discussion settings"
      >
        <SettingsIcon className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default ActionsMenu;
