import { HubConnectionState } from '@microsoft/signalr';
import { HubState } from '../types/hub';

export const getHubConnectionState = (
  currentState: HubConnectionState
): HubState => {
  return {
    isConnected: currentState === HubConnectionState.Connected,
    isConnecting: currentState === HubConnectionState.Connecting,
    isReconnecting: currentState === HubConnectionState.Reconnecting,
    isDisconnected: currentState === HubConnectionState.Disconnected,
    isDisconnecting: currentState === HubConnectionState.Disconnecting,
  };
};
