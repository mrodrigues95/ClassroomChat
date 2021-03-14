import React, { useEffect, useMemo, useRef, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';
import MessageBox from './MessageBox';
import MessageDivider from './MessageDivider';
import Spinner from '../Spinner';
import Message from './Message';
import Error from './../Error';
import * as types from '../../../shared/types/api';
import Button from './../Button';
import InfiniteScrolling from './../InfiniteScrolling';

type GroupedMessagesMap = Map<string, types.Message[]>;

type Props = {
  messages: types.Message[] | null;
  loading: boolean;
  error: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  allowReconnect: boolean;
  reconnect: () => Promise<boolean>;
};

const MessageContainer = ({
  messages,
  loading,
  error,
  fetchNextPage,
  hasNextPage = false,
  allowReconnect,
  reconnect,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  // Group the messages by createdAt dates so they can be separated in the message box.
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

  const handleReconnect = async () => {
    setIsReconnecting(true);
    await reconnect().then((success) => {
      setIsReconnecting(false);

      if (!success) {
        toast.error(
          'Reconnect failed. Please check your connection and try again.'
        );
      } else {
        toast.success('Reconnected!');
      }
    });
  };

  return (
    <>
      <div
        ref={rootRef}
        className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md"
      >
        <div className="h-full px-4 py-2 overflow-y-auto">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          ) : error ? (
            <Error message="Sorry, we can't load any messages right now" />
          ) : (
            <>
              {groupedMessages && groupedMessages.size > 0 ? (
                <>
                  <InfiniteScrolling
                    rootRef={rootRef}
                    onIntersect={fetchNextPage}
                    enabled={hasNextPage}
                  />
                  {[...groupedMessages].map(([date, messages]) => (
                    <React.Fragment key={date}>
                      <MessageDivider key={date} date={date} />
                      {messages.map((message, index) => (
                        <Message
                          key={message.id}
                          message={message}
                          isLastMessage={
                            index === messages.length - 1 ? false : true
                          }
                        />
                      ))}
                    </React.Fragment>
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
      {allowReconnect && (
        <div className="z-10 absolute right-0 bottom-0 w-full inline-flex justify-end items-center mb-24 pr-4">
          {isReconnecting ? (
            <Spinner />
          ) : (
            <Button className="text-sm" onClick={() => handleReconnect()}>
              Reconnect
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default MessageContainer;
