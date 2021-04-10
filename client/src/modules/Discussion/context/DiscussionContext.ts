import { createContext } from 'react';
import { PostDiscussionMessageRequest } from '../hooks/useDiscussionHub';

type DiscussionContextType = {
  handleNewDiscussionMessage: (
    newMessage: PostDiscussionMessageRequest
  ) => void;
  disableNewMessages: boolean;
};

const DiscussionContext = createContext<DiscussionContextType | null>(null);

export default DiscussionContext;
