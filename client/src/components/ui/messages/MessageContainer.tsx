import React from 'react';
import MessageBox from './MessageBox';

const MessageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col absolute inset-0 border border-transparent shadow-container rounded-md">
      <div className="h-full p-3 overflow-y-auto">{children}</div>
      <MessageBox />
    </div>
  );
};

export default MessageContainer;
