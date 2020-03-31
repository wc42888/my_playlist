import React, { useState as useStateMock } from 'react';
import { mount } from 'enzyme';
import { fromJS, List } from 'immutable';
import { useSelector } from 'react-redux';
import PlaylistCard, { InfoSection, Container } from './PlaylistCard';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('test PlaylistCard component', () => {
  let playlistCard;
  const id = 'testId';
  const name = 'testName';
  const tracks = [{ id: 'track1' }, { id: 'track2' }];

  const setExpand = jest.fn();

  describe('test playlist with no tracks', () => {
    beforeEach(() => {
      useStateMock.mockImplementation((init) => [init, setExpand]);

      const playlist = fromJS({
        id,
        name,
      });
      playlistCard = mount(<PlaylistCard playlist={playlist} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render correct playlist name', () => {
      expect(
        playlistCard.find(InfoSection).find('#playlistName').first().text(),
      ).toBe(name);
    });

    it('should not render track section', () => {
      expect(playlistCard.find('#trackSection').exists()).toBeFalsy();
    });

    it('should call expand state state when i click on the playlist card', () => {
      const container = playlistCard.find(Container).first();

      container.simulate('click');
      expect(setExpand).toHaveBeenCalled();
    });
  });

  const tracksSelectorResult = List([
    { id: 'track1', name: 'track1' },
    { id: 'track2', name: 'track2' },
  ]);

  describe('test playlist with tracks', () => {
    beforeEach(() => {
      useSelector.mockImplementationOnce(() => tracksSelectorResult);
      useStateMock.mockImplementation(() => [true, setExpand]);

      const playlist = fromJS({
        id,
        name,
        tracks,
      });
      playlistCard = mount(<PlaylistCard playlist={playlist} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render track section', () => {
      expect(playlistCard.find('#trackSection').exists()).toBeTruthy();
    });

    it('should render track of the same size', () => {
      expect(playlistCard.find('#trackSection')).toHaveLength(
        tracksSelectorResult.size,
      );
    });
  });
});
