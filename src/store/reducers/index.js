import { combineReducers } from 'redux-immutable';
import userProfile from './userProfile';
import entities from './entities';

export default combineReducers({
  entities,
  userProfile,
});
