import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageContainer from '../ui/messages/MessageContainer';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';
import useDiscussion from '../../data/queries/useDiscussion';
import useDiscussionMessages from '../../data/queries/useDiscussionMessages';
import useCreateDiscussionMessage, {
  PostDiscussionMessageRequest,
} from '../../data/mutations/useCreateDiscussionMessage';
import { Message } from '../../shared/types';
import useDiscussionHub from './../../shared/hooks/useDiscussionHub';

type DiscussionContextType = {
  handleNewDiscussionMessage: (
    newMessage: PostDiscussionMessageRequest
  ) => void;
};

export const DiscussionContext = createContext<DiscussionContextType | null>(
  null
);

const Discussion = () => {
  const { uuid: discussionId } = useParams();
  const discussionQuery = useDiscussion(discussionId);
  const messagesQuery = useDiscussionMessages(discussionId);
  const createDiscussionMessage = useCreateDiscussionMessage();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const { createHub } = useDiscussionHub(discussionId, { enabled: false });

  useEffect(() => {
    if (discussionQuery.isSuccess && messagesQuery.isSuccess) {
      createHub();
      setMessages(messagesQuery.data.messages);
    }
  }, [discussionQuery, messagesQuery, createHub]);

  const handleNewDiscussionMessage = useCallback(
    (newMessage: PostDiscussionMessageRequest) => {
      createDiscussionMessage.mutate(newMessage);
    },
    [createDiscussionMessage]
  );

  return (
    <DiscussionContext.Provider value={{ handleNewDiscussionMessage }}>
      <Sidebar />
      <DiscussionContainer discussionQuery={discussionQuery}>
        <MessageContainer
          messages={messages}
          messagesLoading={messagesQuery.isLoading}
          messagesError={messagesQuery.isError}
        />
      </DiscussionContainer>
    </DiscussionContext.Provider>
  );
};

export default Discussion;
