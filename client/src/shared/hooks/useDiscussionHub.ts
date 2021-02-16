import { useMemo, useEffect, useCallback, useState } from 'react';
import useHub from './useHub';
import { PostDiscussionMessageRequest } from '../../data/mutations/useCreateDiscussionMessage';
import { Message } from '../types/api';
import { DiscussionHubEvent } from '../constants/events';
import { HubActionEventMap, HubOptions, HubResponse } from '../types/hub';

const useDiscussionHub = (discussionId: string, opts?: HubOptions) => {
  const [receivedHubMessages, setReceivedHubMessages] = useState<Message[]>([]);

  // TODO: Do something with these responses or just remove them.
  const onConnectionSuccess = (message: HubResponse) => console.log(message);
  const onJoinDiscussion = (message: HubResponse) => console.log(message);
  const onLeaveDiscussion = (message: HubResponse) => console.log(message);

  const onReceiveMessage = useCallback((message: HubResponse) => {
    const incomingMessage = message as Message;
    setReceivedHubMessages((messages) => [...messages, incomingMessage]);
  }, []);

  const discussionEventMap: HubActionEventMap = useMemo(() => {
    const map = new Map() as HubActionEventMap;
    map.set(DiscussionHubEvent.CONNECTION_SUCCESS, onConnectionSuccess);
    map.set(DiscussionHubEvent.JOIN_DISCUSSION, onJoinDiscussion);
    map.set(DiscussionHubEvent.LEAVE_DISCUSSION, onLeaveDiscussion);
    map.set(DiscussionHubEvent.RECEIVE_MESSAGE, onReceiveMessage);
    return map;
  }, [onReceiveMessage]);

  const { hub, hubState, reconnect, start } = useHub(
    process.env.REACT_APP_DISCUSSION_HUB_URL!,
    discussionEventMap,
    opts
  );

  const sendMessage = useCallback(
    async (newMessage: PostDiscussionMessageRequest) => {
      try {
        await hub.current?.invoke('SendMessage', newMessage);
      } catch (err) {
        console.error(err);
      }
    },
    [hub]
  );

  const subscribeToDiscussion = useCallback(async () => {
    try {
      await hub.current?.invoke('SubscribeToDiscussion', discussionId);
    } catch (err) {
      console.error(err);
    }
  }, [hub, discussionId]);

  const invoke = {
    sendMessage: sendMessage,
  };

  // TODO: Move this to onConnectionSuccess.
  useEffect(() => {
    if (hubState.isConnected) subscribeToDiscussion();
  }, [hubState, subscribeToDiscussion]);

  return {
    hubState,
    reconnect,
    start,
    invoke,
    receivedHubMessages,
  };
};

export default useDiscussionHub;
