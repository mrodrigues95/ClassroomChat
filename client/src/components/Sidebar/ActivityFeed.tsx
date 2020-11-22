import React from 'react';
import Avatar from '../ui/Avatar';

type ItemProps = {
  avatarUrl: string;
  message: string;
};

const ActivityFeedItem = ({ avatarUrl, message }: ItemProps) => {
  return (
    <div className="flex items-center">
      <Avatar url={avatarUrl} className='mr-3' />
      {message}
    </div>
  );
};

const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      <ActivityFeedItem
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        message="uploaded an attachment to C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
        message="joined Introduction to Java."
      />
      <ActivityFeedItem
        avatarUrl="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
        message="left C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl="https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
        message="joined Networking Infrastructure."
      />
    </div>
  );
};

export default ActivityFeed;
