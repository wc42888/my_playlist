import axios from 'axios';
import { ROOT_URL } from '../../config/api';
import formatTracksToUri from './formatTracksToUri';

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
