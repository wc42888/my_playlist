import { Map } from 'immutable';
import { GET_USER_PROFILE_SUCCESS } from '../actions/userProfile';

const initialState = Map({});

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return Map(action.payload.user);
    default:
      return state;
  }
};

export default userProfileReducer;
