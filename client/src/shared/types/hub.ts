import { Message } from '../types/api';

export type HubResponse = string | Message | null;

export type HubOptions = {
  enabled?: boolean;
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
