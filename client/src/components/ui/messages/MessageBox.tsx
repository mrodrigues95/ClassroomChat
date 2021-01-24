import React, { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  EmojiHappyIcon,
  PaperClipIcon,
  ChevronIcon,
} from '../../../shared/assets/icons';
import TextArea from './../TextArea';
import { DiscussionContext } from '../../Discussion';
import {
  formatMessage,
  isEmpty,
} from './../../../shared/utils/stringValidation';

const MessageBox = () => {
  const { uuid } = useParams();
  const location = useLocation();
  const discussionContext = useContext(DiscussionContext)!;
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const discussion = location.pathname.includes(`/discussion/${uuid}`);

  const handleNewMessage = () => {
    if (discussion && !isEmpty(message)) {
      discussionContext.handleNewDiscussionMessage({
        discussionId: uuid,
        body: formatMessage(message),
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleNewMessage();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If a user wants to enter a new line, they must use SHIFT+ENTER.
    if (e.target.value !== '\n') {
      setMessage(e.target.value);
    }
  };

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
            placeholder="Message..."
            value={message}
            aria-label="Enter message"
            onChange={(e) => handleOnChange(e)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyPress={(e) => handleKeyPress(e)}
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
            onClick={() => handleNewMessage()}
          >
            <ChevronIcon className="h-5 w-5 text-white transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
