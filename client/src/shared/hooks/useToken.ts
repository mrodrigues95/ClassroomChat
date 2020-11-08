import { useCallback, useRef, useEffect } from 'react';
import decode from 'jwt-decode';
import Axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import useTokenExpiration from './useTokenExpiration';
import { User } from './useAuth';

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export type UserAndTokenResponse = {
  user: User;
} & TokenResponse;

type TokenResponse = {
  accessToken: string;
  tokenExpiration?: string;
};

const getTokenExpirationDate = (accessToken: string) => {
  let token: any = decode(accessToken);
  return new Date(token.exp * 1000);
};

const useToken = (onTokenInvalid: Function, onRefreshRequired: Function) => {
  const currentAccessToken = useRef<string>();
  const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(
    onRefreshRequired
  );

  const setToken = useCallback(
    ({ accessToken }: TokenResponse) => {
      currentAccessToken.current = accessToken;
      const expirationDate = getTokenExpirationDate(accessToken);
      setTokenExpiration(expirationDate);
    },
    [setTokenExpiration]
  );

  const isAuthenticated = useCallback(() => {
    return !!currentAccessToken.current;
  }, []);

  const clearToken = useCallback(
    (shouldClearCookie: boolean = true) => {
      const clearRefreshTokenCookie = shouldClearCookie
        ? axios.get('logout')
        : Promise.resolve();

      return clearRefreshTokenCookie.finally(() => {
        currentAccessToken.current = '';
        clearAutomaticTokenRefresh();
      });
    },
    [clearAutomaticTokenRefresh]
  );

  useEffect(() => {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.authorization = `Bearer ${currentAccessToken.current}`;
        return config;
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401 && currentAccessToken.current) {
          clearToken();
          onTokenInvalid();
        }
        return Promise.reject(error);
      }
    );
    configure({ axios });
  }, [clearToken, onTokenInvalid]);

  return { clearToken, setToken, isAuthenticated };
};

export default useToken;
