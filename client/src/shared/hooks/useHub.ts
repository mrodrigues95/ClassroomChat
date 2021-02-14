import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  IHttpConnectionOptions,
  JsonHubProtocol,
  LogLevel,
} from '@microsoft/signalr';
import { AuthContext } from './auth/useAuth';
import { HubActionEventMap, HubOptions, HubState } from '../types/hub';
import useMounted from './useMounted';

const getHubConnectionState = (
  currentState: HubConnectionState,
  reconnected = false
): HubState => {
  return {
    isConnected: currentState === HubConnectionState.Connected,
    isConnecting: currentState === HubConnectionState.Connecting,
    isReconnecting: currentState === HubConnectionState.Reconnecting,
    isDisconnected: currentState === HubConnectionState.Disconnected,
    isDisconnecting: currentState === HubConnectionState.Disconnecting,
    isReconnected: reconnected,
  };
};

type Hub = {
  hub: HubConnection | null;
  hubState: HubState;
  createHub: () => Promise<boolean>;
  reconnect: () => Promise<boolean>;
};

const useHub = (
  hubUrl: string,
  actionEventMap: HubActionEventMap,
  opts?: HubOptions
): Hub => {
  const { jwt } = useContext(AuthContext)!;
  const [hub, setHub] = useState<HubConnection | null>(null);
  const [hubState, setHubState] = useState<HubState>(
    getHubConnectionState(HubConnectionState.Connecting)
  );
  const [customOpts, setCustomOptions] = useState(opts);
  const mounted = useMounted();

  const defaultOpts: HubOptions = useMemo(() => ({ enabled: true }), []);

  // Memoize the options. If we don't do this, then multiple hubs will be created
  // on initial render.
  const options: HubOptions | undefined = useMemo(() => {
    if (!opts) return defaultOpts;

    Object.entries(customOpts as HubOptions).forEach(([key, value]) => {
      // Options have changed.
      if (opts[key as keyof HubOptions] !== value) {
        setCustomOptions(opts);
        return opts;
      }
    });

    return customOpts;
  }, [opts, defaultOpts, customOpts]);

  const startHub = useCallback(async (connection: HubConnection) => {
    try {
      await connection.start();
      console.assert(connection.state === HubConnectionState.Connected);
      console.log('SignalR connection established.');
      return connection;
    } catch (err) {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.error('SignalR Connection Error: ', err);
      return null;
    }
  }, []);

  const createHub = useCallback(async () => {
    const httpOptions: IHttpConnectionOptions = {
      accessTokenFactory: () => jwt.current!,
      logMessageContent: true,
    };

    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, httpOptions)
      .withAutomaticReconnect()
      .withHubProtocol(new JsonHubProtocol())
      .configureLogging(LogLevel.Information)
      .build();

    connection.serverTimeoutInMilliseconds = 60000;

    connection.onclose((error) => {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.warn('Connection closed.', error);
      if (mounted.current) setHubState(getHubConnectionState(connection.state));
    });

    connection.onreconnecting((error) => {
      console.assert(connection.state === HubConnectionState.Reconnecting);
      console.warn('Connection lost due to error. Reconnecting...', error);
      setHubState(getHubConnectionState(connection.state));
    });

    connection.onreconnected((connectionId) => {
      console.assert(connection.state === HubConnectionState.Connected);
      console.log(
        `Connection re-established. Connected with ${connectionId}`,
        connectionId
      );
      setHubState(getHubConnectionState(connection.state, true));
    });

    actionEventMap.forEach((event, action) => connection.on(action, event));

    return await startHub(connection).then((hub) => {
      if (!hub) return false;
      setHub(hub);
      setHubState(getHubConnectionState(hub.state));
      return true;
    });
  }, [startHub, hubUrl, actionEventMap, jwt, mounted]);

  // This should only be called when the connection has been completely terminated.
  const reconnect = useCallback(async () => {
    return await createHub().then((result) => result);
  }, [createHub]);

  useEffect(() => {
    if (options?.enabled && !hub) createHub();

    return () => {
      hub?.stop();
    };
  }, [createHub, hub, options]);

  return { hub, hubState, createHub, reconnect };
};

export default useHub;
