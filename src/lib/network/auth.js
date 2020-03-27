import moment from 'moment';
import { CLIENT_ID, REDIRECT_URI, ROOT_AUTH_URL } from '../../config/api';

export const getAuth = () =>
  `${ROOT_AUTH_URL}/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;

export const areTokenAndExpiresExist = (token, expires) => token && expires;

export const tokenValid = (token, expires) =>
  moment().isBefore(moment(expires));

export const isAuthorized = () => {
  const accessToken = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('expires');

  return (
    areTokenAndExpiresExist(accessToken, expires) &&
    tokenValid(accessToken, expires)
  );
};
