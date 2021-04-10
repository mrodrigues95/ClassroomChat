import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import toast from 'react-hot-toast';
import { MessageContainer } from '../../common/components';
import {
  DiscussionContainer,
  DiscussionContext,
  useQueryDiscussion,
  useQueryPrefetchDiscussion,
  useQueryDiscussionMessages,
  useQueryPrefetchDiscussionMessages,
  useDiscussionHub,
  PostDiscussionMessageRequest,
} from '../../modules';
import { Message } from '../../common/types';

const Discussion = () => {
  const router = useRouter();
  const { id: discussionId } = router.query;
  const discussionQuery = useQueryDiscussion(discussionId as string);
  const messagesQuery = useQueryDiscussionMessages(discussionId as string);
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [disableNewMessages, setDisableNewMessages] = useState(false);
  const [allowReconnect, setAllowReconnect] = useState(false);
  const { reconnect, start, hubState, invoke } = useDiscussionHub(
    discussionId as string,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (discussionQuery.isSuccess && messagesQuery.isSuccess) {
      const data = messagesQuery.data.pages
        .flatMap((page) => page.data as Message[])
        .reverse();
      setMessages([...data]);
      setReady(true);
    }
  }, [discussionQuery.isSuccess, messagesQuery.isSuccess, messagesQuery.data]);

  useEffect(() => {
    if (ready) start();
  }, [ready, start, discussionId]);

  useEffect(() => {
    toast.remove();

    if (hubState.isReconnecting) {
      toast.loading('Reconnecting...', { duration: 120000 });
      setDisableNewMessages(true);
    } else if (hubState.isDisconnected) {
      toast.error(
        `You've been disconnected. Please check your connection and try reconnecting again.`
      );
      setDisableNewMessages(true);
      setAllowReconnect(true);
    } else if (hubState.isReconnected) {
      toast.success('Reconnected!');
      setDisableNewMessages(false);
    } else if (hubState.isConnected) {
      setDisableNewMessages(false);
      setAllowReconnect(false);
    }
  }, [hubState]);

  const handleNewDiscussionMessage = useCallback(
    (newMessage: PostDiscussionMessageRequest) => {
      invoke.sendMessage(newMessage).catch((err) => console.log(err));
    },
    [invoke]
  );

  const handleManualReconnect = async () => {
    return await reconnect().then((success) => {
      if (!success) return false;

      setAllowReconnect(false);
      setDisableNewMessages(false);
      messagesQuery.refetch();
      return true;
    });
  };

  return (
    <DiscussionContext.Provider
      value={{ handleNewDiscussionMessage, disableNewMessages }}
    >
      <DiscussionContainer discussionQuery={discussionQuery}>
        <MessageContainer
          messages={messages}
          loading={messagesQuery.isLoading}
          error={messagesQuery.isError}
          isFetchingNextPage={messagesQuery.isFetchingNextPage}
          fetchNextPage={messagesQuery.fetchNextPage}
          hasNextPage={messagesQuery.hasNextPage ?? false}
          allowReconnect={allowReconnect}
          reconnect={handleManualReconnect}
        />
      </DiscussionContainer>
    </DiscussionContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const queryClient = new QueryClient();
  await useQueryPrefetchDiscussion(queryClient, id as string);
  await useQueryPrefetchDiscussionMessages(queryClient, id as string);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Discussion;
