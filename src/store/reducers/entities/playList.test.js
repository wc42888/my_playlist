import * as actions from '../../actions/playList';

describe('test user playlist reducers (normalised)', () => {
  describe(`on ${actions.GET_USER_PLAY_LISTS_SUCCESS}`, () => {
    it('should add the playlists to byIds reducer', () => {
      expect(true).toBeTruthy();
    });
    it('should add ids to the allIds reducer', () => {
      expect(true).toBeTruthy();
    });
  });
});
