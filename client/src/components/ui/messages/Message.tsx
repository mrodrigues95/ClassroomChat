import React, { useMemo } from 'react';
import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import * as types from '../../../shared/types';

type Props = {
  message: types.Message;
  lastMessage?: boolean;
};

const Message = ({ message, lastMessage = false }: Props) => {
  const formattedDate = useMemo(() => {
    const date = new Date(message.createdAt);
    if (differenceInDays(new Date(), date) === 0) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (differenceInDays(new Date(), date) === 1) {
      return `Yesterday at ${format(new Date(date), 'p')}`;
    }
    return format(new Date(date), 'MMM d, yyyy');
  }, [message.createdAt]);

  return (
    <div className={clsx('flex items-start', lastMessage && 'pb-2')}>
      <svg width="52" height="52" fill="none">
        <rect x="2" y="2" width="48" height="48" rx="8" fill="#EB5E28" />
      </svg>
      <div className="flex-1 ml-2">
        <div>
          <span className="font-bold">{message.createdBy}</span>
          <span className="ml-2 text-xs text-gray-500">{formattedDate}</span>
        </div>
        <p className="font-semibold text-sm">{message.body}</p>
      </div>
    </div>
  );
};

export default Message;
