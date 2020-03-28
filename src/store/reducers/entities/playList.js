import { combineReducers } from 'redux-immutable';
import { Map, List, fromJS } from 'immutable';
import {
  GET_USER_PLAY_LISTS_SUCCESS,
  POST_NEW_PLAYLIST_SUCCESS,
} from '../../actions/playList';
import { GET_TRACKS_FOR_PLAYLIST_SUCCESS } from '../../actions/tracks';

const byIdInitialState = Map({});

const addPlayerListById = (action) => {
  const newPlayList = action.payload.items.reduce((accumulator, current) => {
    const result = accumulator;

    const { id, name } = current;

    result[id] = {
      id,
      name,
    };

    return result;
  }, {});

  return fromJS(newPlayList);
};

const updatePlaylistWithTracks = (state, action) => {
  const {
    payload: { playlistId, items },
  } = action;

  const tracksIds = items.map((item) => item.track.id);

  return state.setIn([playlistId, 'tracks'], List(tracksIds));
};

const addNewPlaylist = (state, { payload: { id, name } }) =>
  state.set(id, Map({ id, name }));

const userPlaylistById = (state = byIdInitialState, action) => {
  switch (action.type) {
    case GET_USER_PLAY_LISTS_SUCCESS:
      return addPlayerListById(action);
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return updatePlaylistWithTracks(state, action);
    case POST_NEW_PLAYLIST_SUCCESS:
      return addNewPlaylist(state, action);
    default:
      return state;
  }
};

const allIdsInitialState = List([]);

const addPlayerListAllIds = (action) =>
  List(action.payload.items.map((item) => item.id));

const addNewPlaylistId = (state, { payload: { id } }) => state.push(id);

const userPlaylistAllIds = (state = allIdsInitialState, action) => {
  switch (action.type) {
    case GET_USER_PLAY_LISTS_SUCCESS:
      return addPlayerListAllIds(action);
    case POST_NEW_PLAYLIST_SUCCESS:
      return addNewPlaylistId(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: userPlaylistById,
  allIds: userPlaylistAllIds,
});
