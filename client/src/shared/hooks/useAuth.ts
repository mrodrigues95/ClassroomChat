import {
  useCallback,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { AuthEvent } from '../constants';
import useToken, { axios, UserAndTokenResponse } from './useToken';

export type User = {
  id?: string;
  role?: 'student' | 'faculty';
} & UserBase;

type UserBase = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

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

  const onTokenInvalid = () => setUser(null);

  const refreshToken = useCallback(async () => {
    const {
      data: { user, ...rest },
    } = await axios.get<UserAndTokenResponse>('user/refresh');

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
          await clearToken(false);
          setUser(null);
        } else if (event.key === AuthEvent.LOGIN) {
          refreshToken();
        }
      }
    );
  }, [clearToken, isAuthenticated, refreshToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data: user } = await axios.post<UserAndTokenResponse>(
        'user/login',
        {
          email,
          password,
        }
      );

      setToken({ accessToken: user.accessToken });
      setUser(user.user);

      // Fire an event to let all tabs know they should login.
      window.localStorage.setItem(AuthEvent.LOGIN, new Date().toISOString());
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearToken().finally(() => {
      setUser(null);
      // TODO: We need to navigate back to the home screen.
      // history.push('/auth');

      // Fire an event to logout from all tabs.
      window.localStorage.setItem(AuthEvent.LOGOUT, new Date().toISOString());
    });
  }, [clearToken]);

  const register = useCallback(
    async (userToRegister: UserBase) => {
      const {
        data: { user, ...rest },
      } = await axios.post<UserAndTokenResponse>(
        'user/register',
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
  };
};

export default useAuth;
