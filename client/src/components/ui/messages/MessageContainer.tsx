import React from 'react';
import { QueryObserverResult } from 'react-query';
import MessageBox from './MessageBox';
import { GetDiscussionMessagesResponse } from '../../../data/queries/useDiscussionMessages';
import MessageDivider from './MessageDivider';
import Spinner from '../Spinner';
import Message from './Message';
import Error from './../Error';

type Props = {
  messageQuery: QueryObserverResult<GetDiscussionMessagesResponse, unknown>;
};

const MessageContainer = ({ messageQuery }: Props) => {
  return (
    <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
      <div className="h-full p-3 overflow-y-auto">
        {messageQuery.isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : messageQuery.isError ? (
          <Error
            message="Sorry, we can't load any messages right now."
          />
        ) : (
          <>
            <MessageDivider />
            {messageQuery.data?.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </>
        )}
      </div>
      <MessageBox />
    </div>
  );
};

export default MessageContainer;
