import React, { useState } from 'react';
import clsx from 'clsx';
import {
  EmojiHappyIcon,
  PaperClipIcon,
  ChevronIcon,
} from '../../../shared/assets/icons';
import TextArea from './../TextArea';

const MessageBox = () => {
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <div className="z-10 px-3 pb-3 bg-white">
      <div
        className={clsx(
          'flex items-center justify-between h-full p-3 border rounded-md transition ease-in-out duration-150',
          focused ? 'border-transparent shadow-outline' : 'border-gray-300'
        )}
      >
        <div className="flex flex-1 items-center">
          <button
            type="button"
            className="mr-5 focus:outline-none"
            aria-label="View emojis"
          >
            <EmojiHappyIcon className="h-5 w-5 text-gray-600 hover:text-gray-500" />
          </button>
          <TextArea
            placeholder="Write your message..."
            value={message}
            aria-label="Enter message"
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <div className="flex items-center ml-8">
          <button
            type="button"
            className="focus:outline-none"
            aria-label="Add attachment"
          >
            <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-500" />
          </button>
          <button
            type="button"
            className="ml-4 p-2 rounded-full bg-primary shadow-lg text-white focus:outline-none hover:bg-primary-light active:bg-primary-dark"
            aria-label="Send message"
          >
            <ChevronIcon className="h-5 w-5 text-white transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
