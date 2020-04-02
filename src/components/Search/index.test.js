import React, {
  useState as useStateMock,
  useReducer as useReducerMock,
} from 'react';
import { List, fromJS } from 'immutable';
import { shallow } from 'enzyme';
import Search from './index';

describe('test Search component', () => {
  let search;
  const setText = jest.fn();
  useStateMock.mockImplementation((init) => [init, setText]);

  beforeEach(() => {
    const reducerDispatch = jest.fn();
    useReducerMock.mockImplementationOnce(() => [List([]), reducerDispatch]);
    search = shallow(<Search />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search bar component', () => {
    const searchBar = search.find('#searchBar');
    expect(searchBar.exists()).toBeTruthy();
  });

  describe('test when there is no search result', () => {
    beforeEach(() => {
      const reducerDispatch = jest.fn();
      useReducerMock.mockImplementationOnce(() => [List([]), reducerDispatch]);
      search = shallow(<Search />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should not render track list', () => {
      const trackList = search.find('#tracklist');
      expect(trackList.exists()).toBeFalsy();
    });

    it('should not render divider', () => {
      const divider = search.find('#divider');
      expect(divider.exists()).toBeFalsy();
    });
  });

  describe('test when there are search result', () => {
    const tracks = fromJS([
      { id: 'track1', selected: false },
      { id: 'track2', selected: true },
      { id: 'track3', selected: false },
    ]);
    beforeEach(() => {
      const reducerDispatch = jest.fn();

      useReducerMock.mockImplementationOnce(() => [tracks, reducerDispatch]);
      search = shallow(<Search />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render correct number of track cards', () => {
      const trackCards = search.find('#trackList').find('.trackCard');
      expect(trackCards).toHaveLength(tracks.size);
    });

    it('should render the menuButton', () => {
      const menuButton = search.find('#menuButton');
      expect(menuButton.exists()).toBeTruthy();
    });

    it('should render the divider', () => {
      const divider = search.find('#divider');
      expect(divider.exists()).toBeTruthy();
    });
  });
});
