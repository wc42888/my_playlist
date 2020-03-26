import { CLIENT_ID, REDIRECT_URI, ROOT_URL } from '../../config/api';

const getAuth = () =>
  `${ROOT_URL}/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;

export default getAuth;
