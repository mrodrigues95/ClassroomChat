import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
} from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  IHttpConnectionOptions,
  JsonHubProtocol,
  LogLevel,
} from '@microsoft/signalr';
import { HubActionEventMap, HubOptions, HubState } from '../types/hub';
import useMounted from './useMounted';
import { useAuth } from '../../modules';

type Hub = {
  hub: MutableRefObject<HubConnection | null>;
  hubState: HubState;
  reconnect: () => Promise<boolean>;
  start: () => Promise<boolean>;
};

const useHub = (
  hubUrl: string,
  actionEventMap: HubActionEventMap,
  opts?: HubOptions
): Hub => {
  const { jwt } = useAuth();
  const hub = useRef<HubConnection | null>(null);
  const [hubState, setHubState] = useState<HubState>(
    getHubConnectionState(HubConnectionState.Connecting)
  );
  const [customOpts, setCustomOptions] = useState(opts);
  const mounted = useMounted();

  const defaultOpts: HubOptions = useMemo(() => ({ enabled: true }), []);

  // Memoize the options. If we don't do this, then multiple hubs will be created
  // on the initial render.
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

  const connectToHub = useCallback(async (connection: HubConnection) => {
    try {
      await connection.start();
      hub.current = connection;
      setHubState(getHubConnectionState(connection.state));
      console.assert(connection.state === HubConnectionState.Connected);
      console.log('SignalR connection established.');
      return true;
    } catch (err) {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.error('SignalR Connection Error: ', err);
      hub.current = null;
      setHubState(getHubConnectionState(connection.state));
      return false;
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

    // Attempt to start the connection.
    const hubConnected = await connectToHub(connection);
    return hubConnected;
  }, [connectToHub, hubUrl, actionEventMap, jwt, mounted]);

  const stop = useCallback(async () => {
    await hub.current?.stop();
  }, []);

  const start = useCallback(async () => {
    try {
      await stop();
      return await createHub();
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [stop, createHub]);

  const reconnect = useCallback(() => start(), [start]);

  useEffect(() => {
    if (options?.enabled && !hub.current) start();

    return () => {
      stop();
    };
  }, [start, stop, hub, options]);

  return { hub, hubState, reconnect, start };
};

export default useHub;

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
