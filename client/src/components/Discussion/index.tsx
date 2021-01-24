import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import MessageContainer from '../ui/messages/MessageContainer';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';
import useDiscussion from '../../data/queries/useDiscussion';
import useDiscussionMessages from '../../data/queries/useDiscussionMessages';
import useCreateDiscussionMessage, {
  PostDiscussionMessageRequest,
} from '../../data/mutations/useCreateDiscussionMessage';
import { AuthContext } from '../../shared/hooks/auth/useAuth';
import { Message, User } from '../../shared/types';

// TODO: Move this to a hook.
const createHubConnection = async (discussionId: string, user: User) => {
  const connection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/discussionhub')
    .configureLogging(LogLevel.Information)
    .build();

  connection.on('ConnectionSuccess', (message: string) => {
    console.log(message);
  });

  connection.on('JoinedDiscussion', (message: string) => {
    console.log(message);
  });

  connection.on('ReceiveMessage', (message: string) => {
    console.log(message);
  });

  try {
    await connection.start();
  } catch (e) {
    console.error(e);
  }

  if (connection.state === HubConnectionState.Connected) {
    connection
      .invoke('SubscribeToDiscussion', discussionId, user.name)
      .catch((e: Error) => {
        return console.error(e);
      });
  }

  return connection;
};

type DiscussionContextType = {
  handleNewDiscussionMessage: (
    newMessage: PostDiscussionMessageRequest
  ) => void;
};

export const DiscussionContext = createContext<DiscussionContextType | null>(
  null
);

const Discussion = () => {
  const { user } = useContext(AuthContext)!;
  const { uuid: discussionId } = useParams();
  const discussionQuery = useDiscussion(discussionId);
  const messagesQuery = useDiscussionMessages(discussionId);
  const createDiscussionMessage = useCreateDiscussionMessage();
  const [queriesSuccessul, setQueriesSuccessful] = useState(false);
  const [hub, setHub] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    // Only setup a hub connection if the queries were successful.
    if (!hub && queriesSuccessul) {
      createHubConnection(discussionId, user!).then((hub) => setHub(hub));
    }

    return () => {
      hub?.stop();
    };
  }, [discussionId, hub, queriesSuccessul, user]);

  useEffect(() => {
    if (discussionQuery.isSuccess && messagesQuery.isSuccess) {
      setQueriesSuccessful(true);
      setMessages(messagesQuery.data.messages);
    }
  }, [discussionQuery, messagesQuery]);

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
