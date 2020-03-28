import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import { GET_USER_PLAY_LISTS_SUCCESS } from '../../actions/playList';
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

  return Map(newPlayList);
};

const updatePlaylistWithTracks = (state, action) => state;

const userPlaylistById = (state = byIdInitialState, action) => {
  switch (action.type) {
    case GET_USER_PLAY_LISTS_SUCCESS:
      return addPlayerListById(action);
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return updatePlaylistWithTracks(state, action);
    default:
      return state;
  }
};

const allIdsInitialState = List([]);

const addPlayerListAllIds = (action) =>
  List(action.payload.items.map((item) => item.id));

const userPlaylistAllIds = (state = allIdsInitialState, action) => {
  switch (action.type) {
    case GET_USER_PLAY_LISTS_SUCCESS:
      return addPlayerListAllIds(action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: userPlaylistById,
  allIds: userPlaylistAllIds,
});
