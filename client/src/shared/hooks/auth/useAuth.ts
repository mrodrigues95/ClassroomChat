import {
  useCallback,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { AuthEvent } from '../../constants/events';
import { User, UserBase } from '../../types';
import useToken, { axios, UserAndTokenResponse } from './useToken';

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  register: (userToRegister: UserBase) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [waitingForToken, setWaitingForToken] = useState(true);

  const onTokenInvalid = () => setUser(null);

  const refreshToken = useCallback(async () => {
    const {
      data: { user, ...rest },
    } = await axios
      .get<UserAndTokenResponse>('auth/refresh')
      .finally(() => setWaitingForToken(false));

    setUser(user);
    setToken(rest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setToken, clearToken, isAuthenticated } = useToken(
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
          setUser(null);
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

      setUser(user);
      setToken(rest);

      // Fire an event to let all tabs know they should login.
      window.localStorage.setItem(AuthEvent.LOGIN, new Date().toISOString());
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);

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
      setUser(user);
      setToken(rest);
    },
    [setToken]
  );

  return {
    user,
    setUser,
    register,
    login,
    logout,
    refreshToken,
    waitingForToken,
  };
};

export default useAuth;
