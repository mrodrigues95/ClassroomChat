import React, { useEffect, useState } from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import Message from '../ui/messages/Message';
import MessageContainer from '../ui/messages/MessageContainer';
import MessageDivider from '../ui/messages/MessageDivider';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';
import { useParams } from 'react-router-dom';
import useDiscussion from '../../data/queries/useDiscussion';

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
  const { data, isLoading, isError } = useDiscussion(discussionId);
  const [hub, setHub] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (!hub) {
      createHubConnection(discussionId).then((hub) => setHub(hub));
    }

    return () => {
      hub?.stop();
    };
  }, [discussionId, hub]);

  return (
    <>
      <Sidebar />
      <DiscussionContainer title="C# Fundamentals">
        <MessageContainer>
          <MessageDivider />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </MessageContainer>
      </DiscussionContainer>
    </>
  );
};

export default Discussion;
