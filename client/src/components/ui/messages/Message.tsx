import React, { useMemo } from 'react';
import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import * as types from '../../../shared/types/api';
import Avatar from '../Avatar';
import { getRandomAvatar } from '../../../shared/utils/getRandomAvatar';

type Props = {
  message: types.Message;
  isLastMessage?: boolean;
};

const Message = ({ message, isLastMessage = false }: Props) => {
  const formattedDate = useMemo(() => {
    const date = new Date(message.createdAt);
    if (differenceInDays(new Date(), date) === 0) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (differenceInDays(new Date(), date) === 1) {
      return `Yesterday at ${format(new Date(date), 'p')}`;
    }
    return format(new Date(date), 'MMM d, yyyy');
  }, [message]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        isLastMessage && 'pb-2'
      )}
    >
      <div className="flex flex-1">
        <Avatar
          url={message.createdByImageUrl ?? getRandomAvatar()}
          imgClassName="h-5 w-5"
        />
        <div className="flex flex-col w-full ml-2">
          <div>
            <span className="font-bold">{message.createdBy}</span>
            <span className="ml-2 text-xs text-gray-500">{formattedDate}</span>
          </div>
          <p className="font-semibold text-sm w-full break-all">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
