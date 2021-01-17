import React from 'react';
import { format } from 'date-fns';
import * as types from '../../../shared/types';

// TODO: Format dates for the following scenarios:
// If the message was posted today -> 'Today at 12:48 PM',
// If the message was posted yesterday -> 'Yesterday at 3:12 PM',
// Anything after that -> 'MM/dd/yyyy (e.g. 1/14/2021').
const Message = ({ message }: { message: types.Message }) => {
  return (
    <div className="flex items-start pb-2">
      <svg width="52" height="52" fill="none">
        <rect x="2" y="2" width="48" height="48" rx="8" fill="#EB5E28" />
      </svg>
      <div className="flex-1 ml-2">
        <div>
          <span className="font-bold">{message.createdBy}</span>
          <span className="ml-2 text-xs text-gray-500">
            {format(new Date(message.createdAt), 'MM/dd/yyyy')}
          </span>
        </div>
        <p className="font-semibold text-sm">{message.body}</p>
      </div>
    </div>
  );
};

export default Message;
