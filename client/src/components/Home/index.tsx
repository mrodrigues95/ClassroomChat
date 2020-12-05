import React from 'react';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './../Discussion/DiscussionContainer';
import MessageContainer from './../ui/messages/MessageContainer';
import Message from '../ui/messages/Message';
import MessageDivider from '../ui/messages/MessageDivider';

const Home = () => {
  return (
    <div className="flex flex-1 p-3 lg:p-10">
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
    </div>
  );
};

export default Home;
