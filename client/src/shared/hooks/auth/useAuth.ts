import {
  useCallback,
  useEffect,
  useState,
  createContext,
  MutableRefObject,
} from 'react';
import { UserBase } from '../../types/api';
import useToken, { axios, UserAndTokenResponse } from './useToken';
import { AuthEvent } from '../../constants/events';

type AuthContextType = {
  jwt: MutableRefObject<string | undefined>;
  hasUser: boolean;
  register: (userToRegister: UserBase) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  waitingForToken: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const [hasUser, setHasUser] = useState(false);
  const [waitingForToken, setWaitingForToken] = useState(true);

  const onTokenInvalid = () => setHasUser(false);

  const refreshToken = useCallback(async () => {
    try {
      const {
        data: { user, ...rest },
      } = await axios.get<UserAndTokenResponse>('auth/refresh');

      setHasUser(true);
      setToken(rest);
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
    refreshToken();
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
      const {
        data: { user, ...rest },
      } = await axios.post<UserAndTokenResponse>('auth/login', {
        email,
        password,
      });

      setHasUser(true);
      setToken(rest);

      // Fire an event to let all tabs know they should login.
      window.localStorage.setItem(AuthEvent.LOGIN, new Date().toISOString());
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearToken();
    setHasUser(false);

    // Fire an event to logout from all tabs.
    window.localStorage.setItem(AuthEvent.LOGOUT, new Date().toISOString());
  }, [clearToken]);

  const register = useCallback(
    async (userToRegister: UserBase) => {
      const {
        data: { user, ...rest },
      } = await axios.post<UserAndTokenResponse>(
        'auth/register',
        userToRegister
      );

      setHasUser(true);
      setToken(rest);

      // Set a random avatar for the user.
      await axios.put('user/photo/update', {}, { params: { random: true } });
    },
    [setToken]
  );

  return {
    jwt,
    hasUser,
    register,
    login,
    logout,
    waitingForToken,
  };
};

export default useAuth;
