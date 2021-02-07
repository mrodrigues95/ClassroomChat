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
import { getHubConnectionState } from '../utils/hubHelper';
import {
  HubActionEventMap,
  HubConnectionURL,
  HubOptions,
  HubState,
} from '../types/hub';

type Hub = {
  hub: HubConnection | null;
  hubState: HubState;
  createHub: () => Promise<void>;
};

const useHub = (
  hubUrl: HubConnectionURL,
  actionEventMap: HubActionEventMap,
  opts?: HubOptions
): Hub => {
  const { jwt } = useContext(AuthContext)!;
  const [hub, setHub] = useState<HubConnection | null>(null);
  const [hubState, setHubState] = useState<HubState>(
    getHubConnectionState(HubConnectionState.Disconnected)
  );
  const [customOpts, setCustomOptions] = useState(opts);

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
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => jwt.current!,
      logMessageContent: true,
    };

    console.log('Creating hub...');
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, options)
      .withAutomaticReconnect()
      .withHubProtocol(new JsonHubProtocol())
      .configureLogging(LogLevel.Information)
      .build();

    connection.serverTimeoutInMilliseconds = 60000;

    connection.onclose((error) => {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.warn('Connection closed.', error);
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
      setHubState(getHubConnectionState(connection.state));
    });

    actionEventMap.forEach((event, action) => connection.on(action, event));

    await startHub(connection).then((hub) => {
      if (!hub) {
        setTimeout(() => startHub(connection), 5000);
      } else {
        setHub(hub);
        setHubState(getHubConnectionState(hub.state));
      }
    });
  }, [startHub, hubUrl, actionEventMap, jwt]);

  useEffect(() => {
    return () => {
      hub?.stop();
    };
  }, [hub]);

  useEffect(() => {
    if (options?.enabled && !hub) createHub();
  }, [createHub, hub, options]);

  return { hub, hubState, createHub };
};

export default useHub;
