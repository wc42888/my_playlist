import * as api from '../../lib/network/api';

export const GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE';

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    const {
      data: { display_name: displayName, id },
    } = await api.getUserProfile();
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: {
        user: {
          displayName: displayName || 'customer',
          id,
        },
      },
    });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE });
  }
};
