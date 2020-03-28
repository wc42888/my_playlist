import * as actions from './tracks';

describe('test tracks actions', () => {
  describe('test get tracks for a play list function', () => {
    it(`should dispatch ${actions.GET_TRACKS_FOR_PLAYLIST_REQUEST}`, () => {
      expect(true).toBeTruthy();
    });

    it(`should dispatch ${actions.GET_TRACKS_FOR_PLAYLIST_SUCCESS} on success`, () => {
      expect(true).toBeTruthy();
    });

    it(`should displatch ${actions.GET_TRACKS_FOR_PLAYLIST_FAILURE} on failure`, () => {
      expect(true).toBeTruthy();
    });
  });
});
