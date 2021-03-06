import {
  Avatar,
  Button,
  Badge,
  BadgeVariants,
} from '../../../common/components';
import { DotsVerticalIcon } from '../../../common/assets';
import { getRandomAvatar } from '../../../common/utils/getRandomAvatar';

const DiscussionMembers = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center">
        <div className="flex items-center -space-x-2">
          <span className="mr-10">
            <Badge variant={BadgeVariants.PINK}>8 Members</Badge>
          </span>
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
        </div>
        <Button
          variant="primary"
          className="rounded-full ml-2 px-2 py-2 border-none"
          aria-label="View group members"
          defaultPadding={false}
        >
          <DotsVerticalIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default DiscussionMembers;
