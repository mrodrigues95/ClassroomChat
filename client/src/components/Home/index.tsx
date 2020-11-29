import React from 'react';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './../Discussion/DiscussionContainer';
import MessageContainer from './../ui/messages/MessageContainer';
import Message from '../ui/messages/Message';
import MessageDate from '../ui/messages/MessageDate';

const Home = () => {
  return (
    <div className="flex flex-1 p-3 lg:p-10">
      <Sidebar />
      <DiscussionContainer title="C# Fundamentals">
        <MessageContainer>
          <MessageDate />
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
