import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MessageContainer from '../ui/messages/MessageContainer';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './components/DiscussionContainer';
import useQueryDiscussion from '../../data/queries/useQueryDiscussion';
import useQueryDiscussionMessages from '../../data/queries/useQueryDiscussionMessages';
import { PostDiscussionMessageRequest } from '../../data/mutations/useMutationCreateDiscussionMessage';
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
  const discussionQuery = useQueryDiscussion(discussionId);
  const messagesQuery = useQueryDiscussionMessages(discussionId);
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [disableNewMessages, setDisableNewMessages] = useState(false);
  const [allowReconnect, setAllowReconnect] = useState(false);
  const {
    reconnect,
    start,
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
      const lastMessage = [...receivedHubMessages].pop();
      setMessages((messages) => [...messages, lastMessage!]);
    }
  }, [receivedHubMessages]);

  useEffect(() => {
    if (discussionQuery.isSuccess && messagesQuery.isSuccess) {
      setMessages(messagesQuery.data.messages);
      setReady(true);
    }
  }, [discussionQuery, messagesQuery]);

  useEffect(() => {
    if (ready) start();
  }, [ready, start, discussionId]);

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
    </DiscussionContext.Provider>
  );
};

export default Discussion;
