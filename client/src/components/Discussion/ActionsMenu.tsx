import React from 'react';
import {
  AttachmentsIcon,
  CalenderIcon,
  SettingsIcon,
} from '../../shared/assets/icons';
import { Direction } from '../../shared/constants/common';
import Button from '../ui/Button';
import Tooltip from './../ui/Tooltip';

const ActionsMenu = () => {
  return (
    <div className="flex items-center space-x-2">
      <Tooltip message="Calender" direction={Direction.UP}>
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-label="View dicussion calender"
        >
          <CalenderIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
      <Tooltip message="Attachments" direction={Direction.UP}>
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-label="View discussion attachments"
        >
          <AttachmentsIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
      <Tooltip message="Settings" direction={Direction.UP}>
        <Button
          variant="primary"
          className="rounded-sm px-2 py-2 border-none"
          aria-label="View discussion settings"
        >
          <SettingsIcon className="h-8 w-8" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ActionsMenu;
