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
