import React from 'react';

const MessageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full border border-transparent shadow-container rounded-md">
      {children}
    </div>
  );
};

export default MessageContainer;
