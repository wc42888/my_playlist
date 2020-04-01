import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import { getSearchResult } from '../../lib/network';

jest.mock('../../lib/network', () => ({
  getSearchResult: jest.fn(),
}));

const tick = () => new Promise((resolve) => setImmediate(resolve));

describe('test SearchBar component', () => {
  const setText = jest.fn();
  let searchBar;

  describe('test when there is no search text', () => {
    beforeEach(() => {
      searchBar = shallow(<SearchBar setText={setText} searchText="" />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render input element with no input text', () => {
      const input = searchBar.find('#input');
      expect(input.props().value).toBe('');
      expect(input.props().placeholder).toBe('Search your track');
    });

    it('should not render the action button', () => {
      const actionButton = searchBar.find('#actionButton');
      expect(actionButton.exists()).toBeFalsy();
    });
  });

  const searchText = 'search text';

  describe('test when there is search text', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      searchBar = shallow(
        <SearchBar
          setText={setText}
          searchText={searchText}
          dispatch={dispatch}
        />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render input element with the search text', () => {
      const input = searchBar.find('#input');
      expect(input.props().value).toBe(searchText);
    });

    it('should not render the action button', () => {
      const actionButton = searchBar.find('#actionButton');
      expect(actionButton.exists()).toBeTruthy();
    });

    it('should call search tracks and dispatch action on Enter keydown', async () => {
      const tracks = [
        { id: 'id1', name: 'name1', artists: [{ name: 'artist1' }] },
        { id: 'id2', name: 'name2', artists: [{ name: 'artist2' }] },
      ];
      const searchResult = tracks.map(({ id, name, artists }) => ({
        id,
        name,
        artists: artists.map((artist) => artist.name),
      }));
      getSearchResult.mockImplementationOnce(() =>
        Promise.resolve({
          data: { tracks: { items: tracks } },
        }),
      );
      const input = searchBar.find('#input');
      input.simulate('keydown', { key: 'Enter' });
      await tick();
      expect(getSearchResult).toHaveBeenCalledWith(searchText);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_SEARCH_RESULT',
        payload: {
          searchResult,
        },
      });
    });

    it('should call onChange functions', () => {
      const changeValue = 'changeValue';
      const input = searchBar.find('#input');
      input.simulate('change', { target: { value: changeValue } });
      expect(setText).toHaveBeenCalledWith(changeValue);
      expect(dispatch).toHaveBeenCalledWith({ type: 'RESET_SEARCH_RESULT' });
    });
  });
});
