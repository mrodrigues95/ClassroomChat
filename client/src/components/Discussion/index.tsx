import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import MessageContainer from '../ui/messages/MessageContainer';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';
import useDiscussion from '../../data/queries/useDiscussion';
import useDiscussionMessages from '../../data/queries/useDiscussionMessages';
import { PostDiscussionMessageRequest } from '../../data/mutations/useCreateDiscussionMessage';
import { Message } from '../../shared/types/api';
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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const { createHub, hubState, invoke, receivedHubMessages } = useDiscussionHub(
    discussionId,
    {
      enabled: false,
    }
  );

  // Everytime a new message is received while connected to the hub,
  // update the state.
  useEffect(() => {
    // Receved hub messages will be empty on initial connect. Once new
    // messages are sent after the user has connected, this will update.
    if (receivedHubMessages.length) {
      setMessages((messages) => [...messages, ...receivedHubMessages]);
    }
  }, [receivedHubMessages]);

  useEffect(() => {
    if (discussionQuery.isSuccess && messagesQuery.isSuccess) {
      setMessages(messagesQuery.data.messages);
      setDataLoaded(true);
    }
  }, [discussionQuery, messagesQuery]);

  useEffect(() => {
    if (dataLoaded) createHub();
  }, [dataLoaded, createHub]);

  useEffect(() => {
    toast.remove();

    if (hubState.isReconnecting) {
      toast.loading('Reconnecting...');
    } else if (hubState.isDisconnected) {
      toast.error('Error while establishing a connection to this discussion.');
    } else if (hubState.isReconnected) {
      toast.success('Reconnected!');
    }
  }, [hubState]);

  const handleNewDiscussionMessage = useCallback(
    (newMessage: PostDiscussionMessageRequest) => {
      invoke.sendMessage(newMessage).catch((err) => console.log(err));
    },
    [invoke]
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
      <Toaster toastOptions={{ className: 'font-bold' }} />
    </DiscussionContext.Provider>
  );
};

export default Discussion;
