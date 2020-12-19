import React from 'react';
import {
  AttachmentsIcon,
  CalenderIcon,
  SettingsIcon,
} from '../../shared/assets/icons';
import Button from '../ui/Button';
import Tooltip from './../ui/Tooltip';

const ActionsMenu = () => {
  return (
    <div className="flex items-center space-x-2">
      <Tooltip message="Calender" placement="top">
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-labelledby="tooltip-label"
        >
          <CalenderIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
      <Tooltip message="Attachments" placement="top">
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-labelledby="tooltip-label"
        >
          <AttachmentsIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
      <Tooltip message="Settings" placement="top">
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-labelledby="tooltip-label"
        >
          <SettingsIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ActionsMenu;
