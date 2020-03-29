import axios from 'axios';
import moment from 'moment';
import { ROOT_URL } from '../../config/api';
import formatTracksToUri from './formatTracksToUri';
import { isAuthorized, refreshAccessToken } from './auth';

const client = axios.create({
  baseURL: `${ROOT_URL}/v1`,
});

export const getNewToken = async () => {
  const {
    data: { access_token: accessToken, expires_in: expires },
  } = await refreshAccessToken();

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('expires', moment().add(expires, 's').format());
  return accessToken;
};

const configHeader = async (config) => {
  let accessToken = localStorage.getItem('accessToken');

  if (!isAuthorized()) {
    accessToken = await getNewToken();
  }

  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

client.interceptors.request.use((config) => {
  try {
    const newConfig = configHeader(config);
    return newConfig;
  } catch (error) {
    window.location.href = '/login';
    return false;
  }
});

// GET REQUESTS
export const getUserProfile = () => client.get('/me');
export const getUserPlaylists = () => client.get('/me/playlists');
export const getTracksForPlaylist = (id) =>
  client.get(`/playlists/${id}/tracks`);
export const getSearchResult = (keyword) =>
  client.get(`/search?q=${keyword}&type=track`);

// POST REQUESTS
export const postNewPlaylist = (userId, playlistInfo) =>
  client.post(`users/${userId}/playlists`, playlistInfo);

export const postNewTrackToPlaylist = (playlistId, tracks) =>
  client.post(`/playlists/${playlistId}/tracks`, {
    uris: formatTracksToUri(tracks),
  });
