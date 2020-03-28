import { combineReducers } from 'redux-immutable';
import playList from './playList';
import track from './track';

export default combineReducers({
  playList,
  track,
});
