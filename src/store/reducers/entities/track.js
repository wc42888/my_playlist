import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import {
  GET_TRACKS_FOR_PLAYLIST_SUCCESS,
  POST_TRACKS_TO_PLAYLIST_SUCCESS,
} from '../../actions/tracks';

const byIdInitialState = Map({});

const reducerToMap = (tracks) =>
  tracks.reduce((accumulator, current) => {
    const result = accumulator;
    const { id, name } = current;

    result[id] = {
      id,
      name,
    };
    return result;
  }, {});

const addTrackById = (state, { payload: { items } }) => {
  const tracks = items.map((item) => item.track);
  const newTrack = reducerToMap(tracks);

  return state.mergeDeep(Map(newTrack));
};

const addTracks = (state, { payload: { tracks } }) => {
  const newTracks = reducerToMap(tracks);
  return state.mergeDeep(Map(newTracks));
};

const trackById = (state = byIdInitialState, action) => {
  switch (action.type) {
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return addTrackById(state, action);
    case POST_TRACKS_TO_PLAYLIST_SUCCESS:
      return addTracks(state, action);
    default:
      return state;
  }
};

const allIdsInitialState = List([]);

const mergeWithoutDuplication = (currentState, newState) =>
  currentState.concat(
    newState.filter((item) => currentState.indexOf(item) < 0),
  );

const addtrackAllIds = (state, { payload: { items } }) => {
  const newIds = List(items.map((track) => track.track.id));
  return mergeWithoutDuplication(state, newIds);
};

const addNewTrackIds = (state, { payload: { tracks } }) => {
  const newIds = List(tracks.map((track) => track.id));
  return mergeWithoutDuplication(state, newIds);
};

const trackAllIds = (state = allIdsInitialState, action) => {
  switch (action.type) {
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return addtrackAllIds(state, action);
    case POST_TRACKS_TO_PLAYLIST_SUCCESS:
      return addNewTrackIds(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: trackById,
  allIds: trackAllIds,
});
