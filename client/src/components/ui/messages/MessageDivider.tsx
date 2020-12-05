import React from 'react';

const MessageDivider = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-400"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white font-bold">
          Today
        </span>
      </div>
    </div>
  );
};

export default MessageDivider;
