import React from 'react';
import Message from '../ui/messages/Message';
import MessageContainer from '../ui/messages/MessageContainer';
import MessageDivider from '../ui/messages/MessageDivider';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './DiscussionContainer';

const Discussion = () => {
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
