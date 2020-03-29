import * as actions from '../../actions/tracks';

describe('test tracks reducer (normalised)', () => {
  describe(`on ${actions.GET_TRACKS_FOR_PLAYLIST_SUCCESS}`, () => {
    it('should add the tracks to byIds reducer', () => {
      expect(true).toBeTruthy();
    });
    it('sjpi;d add track ids to the allIds reducer', () => {
      expect(true).toBeTruthy();
    });
  });

  describe(`on ${actions.POST_TRACKS_TO_PLAYLIST_SUCCESS}`, () => {
    it('should merge the tracks to the current track', () => {
      expect(true).toBeTruthy();
    });
    it('should merge tracks ids to the current track ids', () => {
      expect(true).toBeTruthy();
    });
  });
});
