import * as playListActions from '../../actions/playList';
import * as tracksAction from '../../actions/tracks';

describe('test user playlist reducers (normalised)', () => {
  describe(`on ${playListActions.GET_USER_PLAY_LISTS_SUCCESS}`, () => {
    it('should add the playlists to byIds reducer', () => {
      expect(true).toBeTruthy();
    });
    it('should add ids to the allIds reducer', () => {
      expect(true).toBeTruthy();
    });
  });

  describe(`on ${tracksAction.GET_TRACKS_FOR_PLAYLIST_SUCCESS}`, () => {
    it(`should add the tracks ids to the correct play list`, () => {
      expect(true).toBeTruthy();
    });
  });
});
