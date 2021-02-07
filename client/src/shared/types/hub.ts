import { Message } from '../types/api';

export enum HubConnectionURL {
  DISUCUSSION_HUB = 'http://localhost:5000/discussionhub',
}

export type HubResponse = string | Message;

export type HubOptions = {
  enabled?: boolean;
  onReconnected?: () => void;
};

export type HubActionEventMap = Map<string, (message: HubResponse) => void>;

export type HubState = {
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  isDisconnected: boolean;
  isDisconnecting: boolean;
  isReconnected: boolean;
};
