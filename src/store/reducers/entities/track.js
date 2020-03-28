import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import { GET_TRACKS_FOR_PLAYLIST_SUCCESS } from '../../actions/tracks';

const byIdInitialState = Map({});

const addTrackById = (action) => {
  const newTrack = action.payload.items.reduce((accumulator, current) => {
    const result = accumulator;

    const {
      track: { id, name },
    } = current;

    result[id] = {
      id,
      name,
    };

    return result;
  }, {});

  return Map(newTrack);
};

const trackById = (state = byIdInitialState, action) => {
  switch (action.type) {
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return addTrackById(action);
    default:
      return state;
  }
};

const allIdsInitialState = List([]);

const addtrackAllIds = (action) =>
  List(action.payload.items.map((item) => item.track.id));

const trackAllIds = (state = allIdsInitialState, action) => {
  switch (action.type) {
    case GET_TRACKS_FOR_PLAYLIST_SUCCESS:
      return addtrackAllIds(action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: trackById,
  allIds: trackAllIds,
});
