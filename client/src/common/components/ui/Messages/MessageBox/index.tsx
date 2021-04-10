import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  EmojiHappyIcon,
  PaperClipIcon,
  ChevronIcon,
} from '../../../../assets/icons';
import TextArea from '../../TextArea';
import { formatMessage, isEmpty } from '../../../../utils/stringValidation';
import { DiscussionContext } from '../../../../../modules';

const MessageBox = () => {
  const router = useRouter();
  const { id } = router.query;
  const { handleNewDiscussionMessage, disableNewMessages } = useContext(
    DiscussionContext
  )!;
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const discussion = router.pathname.includes(`/discussion/${id}`);

  const handleNewMessage = () => {
    if (discussion && !isEmpty(message)) {
      handleNewDiscussionMessage({
        discussionId: id as string,
        body: formatMessage(message),
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) handleNewMessage();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If a user wants to enter a new line, they must use SHIFT+ENTER.
    if (e.target.value !== '\n') setMessage(e.target.value);
  };

  return (
    <div
      className={clsx(
        'z-10 px-4 pb-3 bg-white',
        disableNewMessages ? 'cursor-not-allowed' : 'cursor-default'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between h-full p-3 border rounded-md transition ease-in-out duration-150',
          focused ? 'border-transparent shadow-outline' : 'border-gray-300',
          disableNewMessages
            ? 'bg-gray-100 pointer-events-none border-none'
            : 'pointer-events-auto bg-white border'
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
            className={clsx(disableNewMessages ? 'bg-gray-100' : 'bg-white')}
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
