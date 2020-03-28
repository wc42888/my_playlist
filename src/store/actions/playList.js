import * as api from '../../lib/network/api';

export const GET_USER_PLAY_LISTS_REQUEST = 'GET_USER_PLAY_LISTS_REQUEST';
export const GET_USER_PLAY_LISTS_SUCCESS = 'GET_USER_PLAY_LISTS_SUCCESS';
export const GET_USER_PLAY_LISTS_FAILURE = 'GET_USER_PLAY_LISTS_FAILURE';

export const getUserPlaylists = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PLAY_LISTS_REQUEST });
    const {
      data: { items },
    } = await api.getUserPlaylists();

    dispatch({ type: GET_USER_PLAY_LISTS_SUCCESS, payload: { items } });
  } catch (error) {
    dispatch({ type: GET_USER_PLAY_LISTS_FAILURE });
  }
};

export const POST_NEW_PLAYLIST_REQUEST = 'POST_NEW_PLAYLIST_REQUEST';
export const POST_NEW_PLAYLIST_SUCCESS = 'POST_NEW_PLAYLIST_SUCCESS';
export const POST_NEW_PLAYLIST_FAILURE = 'POST_NEW_PLAYLIST_FAILURE';

export const postNewPlaylist = (userId, playlistInfo) => async (dispatch) => {
  try {
    dispatch({ type: POST_NEW_PLAYLIST_REQUEST });
    const {
      data: { id, name },
    } = await api.postNewPlaylist(userId, playlistInfo);

    dispatch({ type: POST_NEW_PLAYLIST_SUCCESS, payload: { id, name } });
  } catch (error) {
    window.alert(error.message);
    dispatch({ type: POST_NEW_PLAYLIST_FAILURE });
  }
};
