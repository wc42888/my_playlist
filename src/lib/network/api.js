import axios from 'axios';
import { ROOT_URL } from '../../config/api';

const client = axios.create({
  baseURL: `${ROOT_URL}/v1`,
});

const configHeader = (config) => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

client.interceptors.request.use((config) => {
  const newConfig = configHeader(config);
  return newConfig;
});

// GET REQUESTS
export const getUserProfile = () => client.get('/me');
export const getUserPlaylists = () => client.get('/me/playlists');
