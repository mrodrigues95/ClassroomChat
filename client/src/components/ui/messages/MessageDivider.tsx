import React from 'react';

type Props = {
  date: string;
};

const MessageDivider = ({ date }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white font-bold">{date}</span>
      </div>
    </div>
  );
};

export default MessageDivider;
