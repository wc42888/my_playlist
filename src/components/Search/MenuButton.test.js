import React, { useState as useStateMock } from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import MenuButton from './MenuButton';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('test MenuButton component', () => {
  let menuButton;
  const selectedTracks = fromJS([
    { id: 'track1', name: 'track 1' },
    { id: 'tracl2', name: 'track 2' },
    { id: 'track3', name: 'track 3' },
  ]);
  const setShowOption = jest.fn();

  describe('general tests and container', () => {
    beforeEach(() => {
      useStateMock.mockImplementation((init) => [init, setShowOption]);
      menuButton = shallow(<MenuButton selectedTracks={selectedTracks} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render the correct selected number', () => {
      const selectedNum = menuButton.find('#selectedNum');
      expect(selectedNum.text()).toBe(selectedTracks.size.toString());
    });

    it('should toggle the show option state when click', () => {
      const cardContainer = menuButton.find('#cardContainer').first();
      cardContainer.simulate('click');
      expect(setShowOption).toHaveBeenCalled();
    });
  });

  describe('test show option', () => {
    it('should not show option when show option state is false', () => {
      useStateMock.mockImplementation((init) => [init, setShowOption]);
      menuButton = shallow(<MenuButton selectedTracks={selectedTracks} />);
      const optionSection = menuButton.find('#optionSection');
      expect(optionSection.exists()).toBeFalsy();
    });

    it('shoud show option when show option state is true', () => {
      useStateMock.mockImplementation(() => [true, setShowOption]);
      menuButton = shallow(
        <MenuButton selectedTracks={selectedTracks} userPlaylist={List()} />,
      );
      const optionSection = menuButton.find('#optionSection');

      expect(optionSection.exists()).toBeTruthy();
    });
  });

  const userPlaylist = fromJS([
    { id: 'playlist1', name: 'playlist 1' },
    { id: 'playlist2', name: 'playlist 2' },
    { id: 'playlist3', name: 'playlist 3' },
  ]);

  const clearSelected = jest.fn();

  describe('test the content of options', () => {
    beforeEach(() => {
      useStateMock.mockImplementation(() => [true, setShowOption]);

      menuButton = shallow(
        <MenuButton
          selectedTracks={selectedTracks}
          userPlaylist={userPlaylist}
          clearSelected={clearSelected}
        />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render correct number of option', () => {
      const optionSection = menuButton.find('#optionSection');
      expect(optionSection.children()).toHaveLength(userPlaylist.size);
    });

    it('should dispatch action when any of the option is click', () => {
      const optionSection = menuButton.find('#optionSection');
      const firstOption = optionSection.children().first();
      firstOption.simulate('click');
      expect(mockDispatch).toHaveBeenCalled();
      expect(clearSelected).toHaveBeenCalled();
    });
  });
});
