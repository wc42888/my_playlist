import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';
import MyPlayList from './index';

describe('test MyPlayList component', () => {
  let myPlaylist;

  describe('test when user has no playlist', () => {
    beforeEach(() => {
      myPlaylist = shallow(<MyPlayList userPlaylist={List([])} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render a header section', () => {
      const header = myPlaylist.find('#header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('My playlists');
    });

    it('should render button section and the button', () => {
      const buttonSection = myPlaylist.find('#buttonSection');
      expect(buttonSection.exists()).toBeTruthy();
      const button = buttonSection.find('#button');
      expect(button.exists()).toBeTruthy();
    });

    it('should not render playlist section', () => {
      const playlistSection = myPlaylist.find('#playlistSection');
      expect(playlistSection.exists()).toBeFalsy();
    });
  });

  const userPlaylist = fromJS([{ id: 'playlist 1' }, { id: 'playlist 2' }]);

  describe('test when user has a list of playlist', () => {
    beforeEach(() => {
      myPlaylist = shallow(<MyPlayList userPlaylist={userPlaylist} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render play list section', () => {
      const playlistSection = myPlaylist.find('#playlistSection');
      expect(playlistSection.exists()).toBeTruthy();
    });

    it('shoud render correct number of playlist', () => {
      const playlistSection = myPlaylist.find('#playlistSection');
      expect(playlistSection.children()).toHaveLength(userPlaylist.size);
    });
  });
});
