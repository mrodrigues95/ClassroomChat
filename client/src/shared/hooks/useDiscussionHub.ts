import { useMemo, useEffect, useCallback, useState } from 'react';
import useHub from './useHub';
import { PostDiscussionMessageRequest } from '../../data/mutations/useCreateDiscussionMessage';
import { Message } from '../types/api';
import { DiscussionHubEvent } from '../constants/events';
import { HubActionEventMap, HubOptions, HubResponse } from '../types/hub';

// TODO: Handle reconnecting/disconnected states.
// TODO: Handle error conditions (e.g. message not sent, network issues, etc.)
// Ideas: Show a toast when reconnecting/disconnected. Then, disable the TextArea
// and show a "Reconnect" bottom on the bottom right of the chat box.
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

  const { hub, hubState, createHub } = useHub(
    process.env.REACT_APP_DISCUSSION_HUB_URL!,
    discussionEventMap,
    opts
  );

  const sendMessage = useCallback(
    async (newMessage: PostDiscussionMessageRequest) => {
      try {
        if (!hubState.isConnected) {
          throw new Error(
            "Cannot invoke provided method - hub isn't connected."
          );
        }
        await hub?.invoke('SendMessage', newMessage);
      } catch (err) {
        console.error(err);
      }
    },
    [hub, hubState]
  );

  const subscribeToDiscussion = useCallback(async () => {
    try {
      if (!hubState.isConnected) {
        throw new Error("Cannot invoke provided method - hub isn't connected.");
      }
      await hub?.invoke('SubscribeToDiscussion', discussionId);
    } catch (err) {
      console.error(err);
    }
  }, [hub, discussionId, hubState]);

  const invoke = {
    sendMessage: sendMessage,
  };

  useEffect(() => {
    if (hubState.isConnected) subscribeToDiscussion();
  }, [hubState, subscribeToDiscussion]);

  return { hubState, createHub, invoke, receivedHubMessages };
};

export default useDiscussionHub;
