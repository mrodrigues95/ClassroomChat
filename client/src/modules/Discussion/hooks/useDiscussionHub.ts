import { useMemo, useEffect, useCallback } from 'react';
import useHub from '../../../common/hooks/useHub';
import { HubActionEventMap, HubOptions, HubResponse } from '../../../common/types';
import { useQueryClient } from 'react-query';

export type PostDiscussionMessageRequest = {
  discussionId: number | string;
  body: string;
};

enum DiscussionHubEvent {
  CONNECTION_SUCCESS = 'ConnectionSuccess',
  JOIN_DISCUSSION = 'JoinDiscussion',
  LEAVE_DISCUSSION = 'LeaveDiscussion',
  RECEIVE_MESSAGE = 'ReceiveMessage',
}

const useDiscussionHub = (discussionId: string, opts?: HubOptions) => {
  const queryClient = useQueryClient();

  // TODO: Do something with these responses or just remove them.
  const onConnectionSuccess = (message: HubResponse) => console.log(message);
  const onJoinDiscussion = (message: HubResponse) => console.log(message);
  const onLeaveDiscussion = (message: HubResponse) => console.log(message);

  const onReceiveMessage = useCallback(
    (message: HubResponse) => {
      if (message) {
        queryClient.invalidateQueries(['discussionMessages', discussionId]);
      }
    },
    [discussionId, queryClient]
  );

  const discussionEventMap: HubActionEventMap = useMemo(() => {
    const map = new Map() as HubActionEventMap;
    map.set(DiscussionHubEvent.CONNECTION_SUCCESS, onConnectionSuccess);
    map.set(DiscussionHubEvent.JOIN_DISCUSSION, onJoinDiscussion);
    map.set(DiscussionHubEvent.LEAVE_DISCUSSION, onLeaveDiscussion);
    map.set(DiscussionHubEvent.RECEIVE_MESSAGE, onReceiveMessage);
    return map;
  }, [onReceiveMessage]);

  const { hub, hubState, reconnect, start } = useHub(
    process.env.NEXT_PUBLIC_DISCUSSION_HUB_URL!,
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
  };
};

export default useDiscussionHub;
