import React, { useState, useReducer } from 'react';
import { fromJS, List } from 'immutable';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import TrackCard from './TrackCard';
import MenuButton from './MenuButton';
import { LIGHT_GREY } from '../../typography/color';

export const initialState = List([]);

export const searchResultReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULT':
      return fromJS(action.payload.searchResult);
    case 'RESET_SEARCH_RESULT':
      return initialState;
    case 'TOGGLE_SELECTED_TRACK': {
      const {
        payload: { id },
      } = action;
      const index = state.findIndex((track) => track.get('id') === id);

      return state.update(index, (track) =>
        track.set('selected', !track.get('selected')),
      );
    }
    case 'CLEAR_SELECTED': {
      return state.map((track) => {
        if (track.get('selected')) return track.set('selected', false);
        return track;
      });
    }
    default:
      return state;
  }
};

const Search = ({ userPlaylist }) => {
  const [searchResult, dispatch] = useReducer(
    searchResultReducer,
    initialState,
  );
  const [searchText, setText] = useState('');

  const showSearchResult = () => searchResult.size;

  const selectedTracks = searchResult.filter((track) => track.get('selected'));

  const clearSelected = () => dispatch({ type: 'CLEAR_SELECTED' });

  const renderMenuButton = () =>
    selectedTracks.size ? (
      <MenuButtonContainer>
        <MenuButton
          id="menuButton"
          selectedTracks={selectedTracks}
          userPlaylist={userPlaylist}
          clearSelected={clearSelected}
        />
      </MenuButtonContainer>
    ) : null;

  const renderTrackCards = () =>
    showSearchResult() ? (
      <TrackList id="trackList">
        {renderMenuButton()}
        {searchResult.map((track) => (
          <TrackCard
            className="trackCard"
            key={track.get('id')}
            track={track}
            dispatch={dispatch}
          />
        ))}
      </TrackList>
    ) : null;

  const renderDivider = () => (showSearchResult() ? <Hr id="divider" /> : null);

  return (
    <Container>
      <SearchBar
        id="searchBar"
        dispatch={dispatch}
        searchText={searchText}
        setText={setText}
      />
      {renderDivider()}
      {renderTrackCards()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10pt;
  width: 100%;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Hr = styled.div`
  border-top: 1pt solid ${LIGHT_GREY};
  width: 100%;
  margin-top: 5pt;
`;

const MenuButtonContainer = styled.div`
  margin-right: 100pt;
  align-self: flex-end;
  position: sticky;
  top: 5pt;
`;

export default Search;
