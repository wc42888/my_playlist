import moment from 'moment';
import axios from 'axios';
import { stringify } from 'querystring';
import {
  CLIENT_ID,
  REDIRECT_URI,
  ROOT_AUTH_URL,
  CLIENT_SECRET,
  SCOPE,
} from '../../config/api';

export const getAuth = () =>
  `${ROOT_AUTH_URL}/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

export const areTokenAndExpiresExist = (token, expires) => token && expires;

export const tokenValid = (expires) => moment().isBefore(moment(expires));

const getBasic64 = () => btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const authClient = axios.create({
  baseURL: `${ROOT_AUTH_URL}/api`,
  headers: {
    Authorization: `Basic ${getBasic64()}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const getToken = (code) =>
  authClient.post(
    '/token',
    stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  );

export const refreshAccessToken = () =>
  authClient.post(
    '/token',
    stringify({
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken'),
    }),
  );

export const isAuthorized = () => {
  const accessToken = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('expires');

  return areTokenAndExpiresExist(accessToken, expires) && tokenValid(expires);
};
