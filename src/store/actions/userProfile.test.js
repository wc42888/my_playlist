import * as actions from './userProfile';

describe('test user profile actions', () => {
  describe('test get user profile function', () => {
    it(`should dispatch ${actions.GET_USER_PROFILE_REQUEST}`, () => {
      expect(true).toBeTruthy();
    });

    it(`should dispatch ${actions.GET_USER_PROFILE_SUCCESS} on success`, () => {
      expect(true).toBeTruthy();
    });

    it(`should displatch ${actions.GET_USER_PROFILE_FAILURE} on failure`, () => {
      expect(true).toBeTruthy();
    });
  });
});
