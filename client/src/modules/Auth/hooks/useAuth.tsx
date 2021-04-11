import {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import cookie from 'js-cookie';
import { UserBase } from '../../../common/types';
import useToken, { axios, UserAndTokenResponse } from './useToken';

export const AuthEvent = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  HAS_USER: 'yes',
} as const;

const AuthContext = createContext(
  {} as {
    jwt: MutableRefObject<string | undefined>;
    hasUser: boolean;
    register: (userToRegister: UserBase) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    waitingForToken: boolean;
  }
);

export const AuthProvider = ({ children }: any) => {
  const [hasUser, setHasUser] = useState(false);
  const [waitingForToken, setWaitingForToken] = useState(false);
  const hasUserCookie = Object.keys(AuthEvent)[2];

  const onTokenInvalid = () => setHasUser(false);

  const refreshToken = useCallback(async () => {
    try {
      setWaitingForToken(true);
      const {
        data: { user, ...rest },
      } = await axios.get<UserAndTokenResponse>('auth/refresh');

      setHasUser(true);
      setToken(rest);
    } catch (err) {
      console.error(err);
      setHasUser(false);
      clearToken();
    } finally {
      setWaitingForToken(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { jwt, setToken, clearToken, isAuthenticated } = useToken(
    onTokenInvalid,
    refreshToken
  );

  useEffect(() => {
    if (cookie.get(hasUserCookie)) refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    window.addEventListener(
      'storage',
      async (event: WindowEventMap['storage']) => {
        if (event.key === AuthEvent.LOGOUT && isAuthenticated()) {
          clearToken(false);
          setHasUser(false);
        } else if (event.key === AuthEvent.LOGIN) {
          refreshToken();
        }
      }
    );
  }, [clearToken, isAuthenticated, refreshToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const {
          data: { user, ...rest },
        } = await axios.post<UserAndTokenResponse>('auth/login', {
          email,
          password,
        });

        cookie.set(hasUserCookie, AuthEvent.HAS_USER, {
          sameSite: 'strict',
          secure: true,
        });
        setHasUser(true);
        setToken(rest);

        // Fire an event to let all tabs know they should login.
        window.localStorage.setItem(AuthEvent.LOGIN, new Date().toISOString());
      } catch (err) {
        console.error(err);
        setHasUser(false);
        clearToken();
      }
    },
    [setToken]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post('auth/logout');
    } catch (err) {
      console.error(err);
    }
    clearToken();
    setHasUser(false);

    // Fire an event to logout from all tabs.
    window.localStorage.setItem(AuthEvent.LOGOUT, new Date().toISOString());
  }, [clearToken]);

  const register = useCallback(
    async (userToRegister: UserBase) => {
      try {
        const {
          data: { user, ...rest },
        } = await axios.post<UserAndTokenResponse>(
          'auth/register',
          userToRegister
        );

        cookie.set(AuthEvent.HAS_USER, 'yes', {
          sameSite: 'strict',
          secure: true,
        });
        setHasUser(true);
        setToken(rest);

        // Set a random avatar for the user.
        await axios.put('user/photo/update', {}, { params: { random: true } });
      } catch (err) {
        console.error(err);
        setHasUser(false);
        clearToken();
      }
    },
    [setToken]
  );

  return (
    <AuthContext.Provider
      value={{
        jwt,
        hasUser,
        register,
        login,
        logout,
        waitingForToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
