import React, { useState } from 'react';
import {
  EmojiHappyIcon,
  PaperClipIcon,
  ChevronIcon,
} from '../../../shared/assets/icons';
import TextArea from './../TextArea';

const MessageBox = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="px-3 pb-3 bg-white">
      <div className="flex items-center justify-between h-full p-3 border border-gray-300 rounded-md">
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
            onChange={(e) => setMessage(e.target.value)}
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
