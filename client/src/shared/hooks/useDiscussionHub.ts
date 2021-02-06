import { useMemo, useEffect, useCallback, useState } from 'react';
import { HubConnectionState } from '@microsoft/signalr';
import useHub, { HubOptions, HubActionEventMap, HubResponse } from './useHub';
import { HubConnectionURL } from '../constants/common';
import { PostDiscussionMessageRequest } from '../../data/mutations/useCreateDiscussionMessage';
import { Message } from '../types';

const useDiscussionHub = (discussionId: string, opts?: HubOptions) => {
  const [receivedHubMessages, setReceivedHubMessages] = useState<Message[]>([]);

  // TODO: Do something with these responses or just remove them.
  const connectionSuccess = (message: HubResponse) => console.log(message);
  const joinDiscussion = (message: HubResponse) => console.log(message);
  const leaveDiscussion = (message: HubResponse) => console.log(message);

  const receiveMessage = useCallback((receivedMessage: HubResponse) => {
    setReceivedHubMessages((messages) => [
      ...messages,
      receivedMessage as Message,
    ]);
  }, []);

  const discussionEventMap: HubActionEventMap = useMemo(() => {
    const map = new Map() as HubActionEventMap;
    map.set('ConnectionSuccess', connectionSuccess);
    map.set('JoinDiscussion', joinDiscussion);
    map.set('LeaveDiscussion', leaveDiscussion);
    map.set('ReceiveMessage', receiveMessage);
    return map;
  }, [receiveMessage]);

  const { hub, hubState, createHub } = useHub(
    HubConnectionURL.DISUCUSSION_HUB,
    discussionEventMap,
    opts
  );

  const isConnected = hubState === HubConnectionState.Connected ? true : false;

  const sendMessage = useCallback(
    async (newMessage: PostDiscussionMessageRequest) => {
      try {
        if (!isConnected) {
          throw new Error(
            "Cannot invoke provided method - hub isn't connected."
          );
        }
        await hub?.invoke('SendMessage', newMessage);
      } catch (err) {
        console.error(err);
      }
    },
    [hub, isConnected]
  );

  const subscribeToDiscussion = useCallback(async () => {
    try {
      if (!isConnected) {
        throw new Error("Cannot invoke provided method - hub isn't connected.");
      }
      await hub?.invoke('SubscribeToDiscussion', discussionId);
    } catch (err) {
      console.error(err);
    }
  }, [hub, discussionId, isConnected]);

  const invoke = {
    sendMessage: sendMessage,
  };

  useEffect(() => {
    if (isConnected) subscribeToDiscussion();
  }, [isConnected, subscribeToDiscussion]);

  return { hubState, createHub, invoke, receivedHubMessages };
};

export default useDiscussionHub;
