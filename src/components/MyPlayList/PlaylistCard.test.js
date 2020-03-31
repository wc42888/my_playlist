import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import PlaylistCard, { InfoSection } from './PlaylistCard';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('test PlaylistCard component', () => {
  let playlistCard;

  describe('test playlist with no tracks', () => {
    beforeEach(() => {
      const playlist = fromJS({
        id: 'testId',
        name: 'testName',
      });
      playlistCard = mount(<PlaylistCard playlist={playlist} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render correct playlist name', () => {
      expect(
        playlistCard.find(InfoSection).find('#playlistName').find('div').text(),
      ).toBe('testName');
    });
  });
});
