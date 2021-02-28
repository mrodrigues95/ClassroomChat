import React from 'react';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import { getRandomAvatar } from './../../../shared/utils/getRandomAvatar';

type ItemProps = {
  avatarUrl: string;
  message: string;
};

const ActivityFeedItem = ({ avatarUrl, message }: ItemProps) => {
  return (
    <div className="flex items-center text-gray-700">
      <Avatar url={avatarUrl} className="mr-3" />
      {message}
    </div>
  );
};

const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="uploaded an attachment to C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="joined Introduction to Java."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="left C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="joined Networking Infrastructure."
      />
      <Button className="rounded-xl font-semibold" fullWidth>
        See More
      </Button>
    </div>
  );
};

export default ActivityFeed;
