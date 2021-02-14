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
  disableNewMessages: boolean;
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
  const [disableNewMessages, setDisableNewMessages] = useState(false);
  const [allowReconnect, setAllowReconnect] = useState(false);
  const {
    createHub,
    reconnect,
    hubState,
    invoke,
    receivedHubMessages,
  } = useDiscussionHub(discussionId, {
    enabled: false,
  });

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
      toast.loading('Reconnecting...', { duration: 120000 });
      setDisableNewMessages(true);
    } else if (hubState.isDisconnected) {
      toast.error(
        `You've been disconnected. Please check your connection and try reconnecting again.`
      );
      setDisableNewMessages(true);
      setAllowReconnect(true);
    } else if (hubState.isReconnected) {
      toast.success('Reconnected!');
      setDisableNewMessages(false);
    } else if (hubState.isConnected) {
      setDisableNewMessages(false);
      setAllowReconnect(false);
    }
  }, [hubState]);

  const handleNewDiscussionMessage = useCallback(
    (newMessage: PostDiscussionMessageRequest) => {
      invoke.sendMessage(newMessage).catch((err) => console.log(err));
    },
    [invoke]
  );

  const handleManualReconnect = async () => {
    return await reconnect().then((success) => {
      if (!success) return false;

      setAllowReconnect(false);
      setDisableNewMessages(false);
      messagesQuery.refetch();
      return true;
    });
  };

  return (
    <DiscussionContext.Provider
      value={{ handleNewDiscussionMessage, disableNewMessages }}
    >
      <Sidebar />
      <DiscussionContainer discussionQuery={discussionQuery}>
        <MessageContainer
          messages={messages}
          loading={messagesQuery.isLoading}
          error={messagesQuery.isError}
          allowReconnect={allowReconnect}
          reconnect={handleManualReconnect}
        />
      </DiscussionContainer>
      <Toaster toastOptions={{ className: 'font-bold' }} />
    </DiscussionContext.Provider>
  );
};

export default Discussion;
