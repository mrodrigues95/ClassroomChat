import React from 'react';

const Message = () => {
  return (
    <div className="flex items-start pb-2">
      <svg width="52" height="52" fill="none">
        <rect x="2" y="2" width="48" height="48" rx="8" fill="#EB5E28" />
      </svg>
      <div className="flex-1 ml-2">
        <div>
          <span className="font-bold">John Doe</span>
          <span className="ml-2 text-xs text-gray-500">
            12:48 PM
          </span>
        </div>
        <p className="font-semibold text-sm">Wow, this works!</p>
      </div>
    </div>
  );
};

export default Message;
