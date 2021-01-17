import React, { useEffect, useState } from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import MessageContainer from '../ui/messages/MessageContainer';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';
import { useParams } from 'react-router-dom';
import useDiscussion from '../../data/queries/useDiscussion';
import useDiscussionMessages from '../../data/queries/useDiscussionMessages';

// TODO: Move this to a hook once more hubs are created.
const createHubConnection = async (discussionId: string) => {
  const connection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/discussionhub')
    .configureLogging(LogLevel.Information)
    .build();

  connection.on('Discussion', (message: string) => {
    console.log(message);
  });

  connection.on('NewMessage', (message: any) => {
    console.log(message);
  });

  try {
    await connection.start();
  } catch (e) {
    console.error(e);
  }

  if (connection.state === HubConnectionState.Connected) {
    connection
      .invoke('SubscribeToDiscussion', discussionId)
      .catch((e: Error) => {
        return console.error(e);
      });
  }

  return connection;
};

const Discussion = () => {
  const { uuid: discussionId } = useParams();
  const discussionQuery = useDiscussion(discussionId);
  const discussionMessagesQuery = useDiscussionMessages(discussionId);
  const [queriesSuccessul, setQueriesSuccessful] = useState(false);
  const [hub, setHub] = useState<HubConnection | null>(null);

  useEffect(() => {
    // Only setup a hub connection if the queries were successful.
    if (!hub && queriesSuccessul) {
      createHubConnection(discussionId).then((hub) => setHub(hub));
    }

    return () => {
      hub?.stop();
    };
  }, [discussionId, hub, queriesSuccessul]);

  useEffect(() => {
    if (discussionQuery.isSuccess && discussionMessagesQuery.isSuccess) {
      setQueriesSuccessful(true);
    }
  }, [discussionQuery, discussionMessagesQuery]);

  return (
    <>
      <Sidebar />
      <DiscussionContainer discussionQuery={discussionQuery}>
        <MessageContainer messageQuery={discussionMessagesQuery} />
      </DiscussionContainer>
    </>
  );
};

export default Discussion;
