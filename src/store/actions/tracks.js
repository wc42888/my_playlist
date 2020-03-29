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

export const POST_TRACKS_TO_PLAYLIST_REQUEST =
  'POST_TRACKS_TO_PLAYLIST_REQUEST';

export const POST_TRACKS_TO_PLAYLIST_SUCCESS =
  'POST_TRACKS_TO_PLAYLIST_SUCCESS';

export const POST_TRACKS_TO_PLAYLIST_FAILURE =
  'POST_TRACKS_TO_PLAYLIST_FAILURE';

export const postTracksToPlaylist = (playlistId, tracks) => async (
  dispatch,
) => {
  try {
    dispatch({ type: POST_TRACKS_TO_PLAYLIST_REQUEST });
    await api.postNewTrackToPlaylist(playlistId, tracks);

    dispatch({
      type: POST_TRACKS_TO_PLAYLIST_SUCCESS,
      payload: {
        playlistId,
        tracks,
      },
    });
  } catch (error) {
    console.log('error', error.message);
    dispatch({ type: POST_TRACKS_TO_PLAYLIST_FAILURE });
  }
};
