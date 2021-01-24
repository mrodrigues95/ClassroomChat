import React, { useEffect, useMemo, useRef } from 'react';
import { format, differenceInDays } from 'date-fns';
import MessageBox from './MessageBox';
import MessageDivider from './MessageDivider';
import Spinner from '../Spinner';
import Message from './Message';
import Error from './../Error';
import * as types from '../../../shared/types';

type GroupedMessagesMap = Map<string, types.Message[]>;

type Props = {
  messages: types.Message[] | null;
  messagesLoading: boolean;
  messagesError: boolean;
};

const MessageContainer = ({
  messages,
  messagesLoading,
  messagesError,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  // Group the messages by createdAt dates so we can separate them in the message box.
  const groupedMessages: GroupedMessagesMap | null = useMemo(() => {
    if (!Array.isArray(messages) || !messages.length) return null;
    return (
      messages.reduce((map: GroupedMessagesMap, message) => {
        if (differenceInDays(new Date(), new Date(message.createdAt)) === 0) {
          return map.set('Today', [...(map.get('Today') || []), message]);
        } else if (
          differenceInDays(new Date(), new Date(message.createdAt)) === 1
        ) {
          return map.set('Yesterday', [
            ...(map.get('Yesterday') || []),
            message,
          ]);
        }
        const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
        return map.set(createdAt, [...(map.get(createdAt) || []), message]);
      }, new Map()) || null
    );
  }, [messages]);

  // TODO: Fix unique key bug.
  return (
    <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
      <div className="h-full p-3 overflow-y-auto">
        {messagesLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : messagesError ? (
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
        <div ref={bottomRef} aria-hidden="true" />
      </div>
      <MessageBox />
    </div>
  );
};

export default MessageContainer;
