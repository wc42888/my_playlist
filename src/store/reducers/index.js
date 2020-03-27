import { combineReducers } from 'redux';
import userProfile from './userProfile';
import entities from './entities';

export default combineReducers({
  entities,
  userProfile,
});
