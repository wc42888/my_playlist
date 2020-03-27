import * as actions from './playList';

describe('test play list actions', () => {
  describe('test get user playlists function', () => {
    it(`should dispatch ${actions.GET_USER_PLAY_LISTS_REQUEST}`, () => {
      expect(true).toBeTruthy();
    });

    it(`should dispatch ${actions.GET_USER_PLAY_LISTS_SUCCESS} on success`, () => {
      expect(true).toBeTruthy();
    });

    it(`should displatch ${actions.GET_USER_PLAY_LISTS_FAILURE} on failure`, () => {
      expect(true).toBeTruthy();
    });
  });
});
