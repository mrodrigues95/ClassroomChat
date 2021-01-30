import { useMemo, useContext, useEffect } from 'react';
import { HubConnectionState } from '@microsoft/signalr';
import useHub, { HubOptions, HubActionEventMap } from './useHub';
import { HubConnectionURL } from '../constants/common';
import { AuthContext } from './auth/useAuth';

const useDiscussionHub = (discussionId: string, opts?: HubOptions) => {
  const { user } = useContext(AuthContext)!;

  const connectionSuccess = (message: string) => console.log(message);
  const joinedDiscussion = (message: string) => console.log(message);
  const receiveMessage = (message: string) => console.log(message);

  const discussionEventMap: HubActionEventMap = useMemo(() => {
    const map = new Map() as HubActionEventMap;
    map.set('ConnectionSuccess', connectionSuccess);
    map.set('JoinedDiscussion', joinedDiscussion);
    map.set('ReceiveMessage', receiveMessage);
    return map;
  }, []);

  const { hub, hubState, createHub } = useHub(
    HubConnectionURL.DISUCUSSION_HUB,
    discussionEventMap,
    opts
  );

  useEffect(() => {
    if (hub?.state === HubConnectionState.Connected) {
      hub
        .invoke('SubscribeToDiscussion', discussionId, user?.name)
        .catch((err: Error) => console.error(err));
    }
  }, [hub, hubState, discussionId, user]);

  return { hubState, createHub };
};

export default useDiscussionHub;
