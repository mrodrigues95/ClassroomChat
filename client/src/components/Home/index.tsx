import React from 'react';
import Sidebar from './../Sidebar/index';
import DiscussionContainer from './../Discussion/DiscussionContainer';
import MessageContainer from './../ui/messages/MessageContainer';

const Home = () => {
  return (
    <div className="flex flex-1 p-3 lg:p-10">
      <Sidebar />
      <DiscussionContainer title="C# Fundamentals">
        <MessageContainer>
          <div>Test</div>
        </MessageContainer>
      </DiscussionContainer>
    </div>
  );
};

export default Home;
