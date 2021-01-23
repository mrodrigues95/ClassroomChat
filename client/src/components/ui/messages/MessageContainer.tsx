import React, { useMemo } from 'react';
import { QueryObserverResult } from 'react-query';
import { format, differenceInDays } from 'date-fns';
import MessageBox from './MessageBox';
import { GetDiscussionMessagesResponse } from '../../../data/queries/useDiscussionMessages';
import MessageDivider from './MessageDivider';
import Spinner from '../Spinner';
import Message from './Message';
import Error from './../Error';
import * as types from '../../../shared/types';

type Props = {
  messageQuery: QueryObserverResult<GetDiscussionMessagesResponse, unknown>;
};

const MessageContainer = ({ messageQuery }: Props) => {
  // Group messages by createdAt dates so we can separate them in the message box.
  const groupedMessages: Map<string, types.Message[]> | null = useMemo(() => {
    return (
      messageQuery.data?.messages.reduce(
        (entryMap: Map<string, types.Message[]>, message) => {
          if (differenceInDays(new Date(), new Date(message.createdAt)) === 0) {
            return entryMap.set('Today', [
              ...(entryMap.get('Today') || []),
              message,
            ]);
          } else if (
            differenceInDays(new Date(), new Date(message.createdAt)) === 1
          ) {
            return entryMap.set('Yesterday', [
              ...(entryMap.get('Yesterday') || []),
              message,
            ]);
          }
          const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
          return entryMap.set(createdAt, [
            ...(entryMap.get(createdAt) || []),
            message,
          ]);
        },
        new Map()
      ) || null
    );
  }, [messageQuery]);

  return (
    <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
      <div className="h-full p-3 overflow-y-auto">
        {messageQuery.isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : messageQuery.isError ? (
          <Error message="Sorry, we can't load any messages right now" />
        ) : (
          <>
            {groupedMessages && groupedMessages.size > 0 ? (
              <>
                {[...groupedMessages].map(([date, messages], index) => (
                  <>
                    <MessageDivider key={index} date={date} />
                    {messages.map((message, index) => (
                      <Message
                        key={index}
                        message={message}
                        lastMessage={
                          index === messages.length - 1 ? false : true
                        }
                      />
                    ))}
                  </>
                ))}
              </>
            ) : (
              <Error
                message="No messages found"
                altMessage="Be the first to start the discussion!"
                showAction={false}
              />
            )}
          </>
        )}
      </div>
      <MessageBox />
    </div>
  );
};

export default MessageContainer;
