import React, { useMemo } from 'react';
import { differenceInDays, format, formatDistance } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import clsx from 'clsx';
import * as types from '../../../../types/api';
import Avatar from '../../Avatar';
import { getRandomAvatar } from '../../../../utils/getRandomAvatar';

type Props = {
  message: types.Message;
  isLastMessage?: boolean;
};

const Message = ({ message, isLastMessage = false }: Props) => {
  const formattedDate = useMemo(() => {
    const currentDate = utcToZonedTime(new Date(), 'UTC');
    const messageDate = new Date(message.createdAt);
    console.log(currentDate)
    console.log(messageDate)
    if (differenceInDays(currentDate, messageDate) === 0) {
      return formatDistance(messageDate, currentDate, { addSuffix: true });
    } else if (differenceInDays(currentDate, messageDate) === 1) {
      return `Yesterday at ${format(messageDate, 'p')}`;
    }
    return format(messageDate, 'MMM d, yyyy');
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
