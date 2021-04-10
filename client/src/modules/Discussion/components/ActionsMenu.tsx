import {
  AttachmentsIcon,
  CalendarIcon,
  SettingsIcon,
} from '../../../common/assets';
import { Button, Tooltip } from '../../../common/components';

const ActionsMenu = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center space-x-2">
        <Tooltip message="Calender" placement="top-center">
          <Button
            variant="primary"
            className="rounded-sm px-2 py-2 border-none"
            aria-describedby="cc-tooltip"
            defaultPadding={false}
          >
            <CalendarIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
        <Tooltip message="Attachments" placement="top-center">
          <Button
            variant="primary"
            className="rounded-sm px-2 py-2 border-none"
            aria-describedby="cc-tooltip"
            defaultPadding={false}
          >
            <AttachmentsIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
        <Tooltip message="Settings" placement="top-center">
          <Button
            variant="primary"
            className="rounded-sm px-2 py-2 border-none"
            aria-describedby="cc-tooltip"
            defaultPadding={false}
          >
            <SettingsIcon className="h-8 w-8" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionsMenu;
