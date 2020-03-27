import { combineReducers } from 'redux';
import { GET_USER_PLAY_LISTS_SUCCESS } from '../../actions/playList';

const byIdInitialState = {};

const addPlayerListById = (action) => {
  const newPlayList = action.payload.items.reduce((accumulator, current) => {
    const result = accumulator;

    const { id } = current;

    result[id] = {
      id,
    };

    return result;
  }, {});

  return newPlayList;
};

const userPlaylistById = (state = byIdInitialState, action) => {
  switch (action.type) {
    case GET_USER_PLAY_LISTS_SUCCESS:
      return addPlayerListById(action);
    default:
      return state;
  }
};

const allIdsInitialState = [];

const addPlayerListAllIds = (action) =>
  action.payload.items.map((item) => item.id);

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
