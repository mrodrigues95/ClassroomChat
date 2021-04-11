import { useCallback, useRef, useEffect } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import cookie from 'js-cookie';
import useTokenExpiration from './useTokenExpiration';
import { User } from '../../../common/types';
import { AuthEvent } from './useAuth';

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export type UserAndTokenResponse = {
  user: User;
} & TokenResponse;

type TokenResponse = {
  accessToken: string;
  expiresAt: Date;
};

const useToken = (onTokenInvalid: Function, onRefreshRequired: Function) => {
  const jwt = useRef<string>();

  const { clearAutomaticTokenRefresh, setTokenExpiration } = useTokenExpiration(
    onRefreshRequired
  );

  const setToken = useCallback(
    ({ accessToken, expiresAt }: TokenResponse) => {
      jwt.current = accessToken;
      const expirationDate = new Date(expiresAt);
      setTokenExpiration(expirationDate);
    },
    [setTokenExpiration]
  );

  const isAuthenticated = useCallback(() => {
    return !!jwt.current;
  }, []);

  const clearToken = useCallback(
    (shouldClearUserCookie: boolean = true) => {
      // This can be false if we are coming from a different tab.
      // In that case, we do not want to clear the user cookie.
      if (shouldClearUserCookie) cookie.remove(Object.keys(AuthEvent)[2]);
      jwt.current = '';
      clearAutomaticTokenRefresh();
    },
    [clearAutomaticTokenRefresh]
  );

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.authorization = `Bearer ${jwt.current}`;
        return config;
      }
    );

    axios.interceptors.response.use(
      (response) => {
        const pagination = response.headers['pagination'];
        if (pagination) {
          const paginatedResponse = {
            ...response,
            data: response.data,
            pagination: JSON.parse(pagination),
          };
          return paginatedResponse;
        }
        return response;
      },
      (error) => {
        if (error?.response?.status === 401 && jwt.current) {
          clearToken();
          onTokenInvalid();
        }
        return Promise.reject(error);
      }
    );
    configure({ axios });
  }, [clearToken, onTokenInvalid]);

  return { jwt, clearToken, setToken, isAuthenticated };
};

export default useToken;
