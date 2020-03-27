import { GET_USER_PROFILE_SUCCESS } from '../actions/userProfile';

const initialState = {};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return action.payload.user;
    default:
      return state;
  }
};

export default userProfileReducer;
