import { useCallback, useRef, useEffect } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import Cookies from 'js-cookie';
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
  expiresAt: Date;
};

const useToken = (onTokenInvalid: Function, onRefreshRequired: Function) => {
  const jwtAccessToken = useRef<string>();
  const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(
    onRefreshRequired
  );

  const setToken = useCallback(
    ({ accessToken, expiresAt }: TokenResponse) => {
      jwtAccessToken.current = accessToken;
      const expirationDate = new Date(expiresAt);
      setTokenExpiration(expirationDate);
    },
    [setTokenExpiration]
  );

  const isAuthenticated = useCallback(() => {
    return !!jwtAccessToken.current;
  }, []);

  const clearToken = useCallback(
    (shouldClearRefreshTokenCookie: boolean = true) => {
      // This can be false if we are comming from a different tab.
      // In that case, we do not want to clear the refresh token cookie.
      if (shouldClearRefreshTokenCookie) {
        Cookies.remove('refresh_token');
      }

      jwtAccessToken.current = '';
      clearAutomaticTokenRefresh();
    },
    [clearAutomaticTokenRefresh]
  );

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.authorization = `Bearer ${jwtAccessToken.current}`;
        return config;
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401 && jwtAccessToken.current) {
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
