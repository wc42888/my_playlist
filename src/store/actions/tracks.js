import * as api from '../../lib/network/api';

export const GET_TRACKS_FOR_PLAYLIST_REQUEST =
  'GET_TRACKS_FOR_PLAYLIST_REQUEST';
export const GET_TRACKS_FOR_PLAYLIST_SUCCESS =
  'GET_TRACKS_FOR_PLAYLIST_SUCCESS';
export const GET_TRACKS_FOR_PLAYLIST_FAILURE =
  'GET_TRACKS_FOR_PLAYLIST_FAILURE';

export const getTracksForPlaylist = (playlistId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TRACKS_FOR_PLAYLIST_REQUEST });
    const {
      data: { items },
    } = await api.getTracksForPlaylist(playlistId);

    dispatch({
      type: GET_TRACKS_FOR_PLAYLIST_SUCCESS,
      payload: { playlistId, items },
    });
  } catch (error) {
    dispatch({ type: GET_TRACKS_FOR_PLAYLIST_FAILURE });
  }
};
