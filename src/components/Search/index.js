import React, { useState, useReducer } from 'react';
import { fromJS, List } from 'immutable';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import TrackCard from './TrackCard';
import MenuButton from './MenuButton';
import { LIGHT_GREY } from '../../typography/color';

const initialState = List([]);

const searchResultReducer = (state = initialState, action = {}) => {
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

  const renderMenuButton = () =>
    selectedTracks.size ? (
      <MenuButtonContainer>
        <MenuButton />
      </MenuButtonContainer>
    ) : null;

  const renderTrackCards = () =>
    showSearchResult() ? (
      <TrackList>
        {renderMenuButton()}
        {searchResult.map((track) => (
          <TrackCard key={track.get('id')} track={track} dispatch={dispatch} />
        ))}
      </TrackList>
    ) : null;

  const renderDivider = () => (showSearchResult() ? <Hr /> : null);

  return (
    <Container>
      <SearchBar
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
  overflow: scroll;
`;

const Hr = styled.div`
  border-top: 1pt solid ${LIGHT_GREY};
  width: 100%;
  margin-top: 5pt;
`;

const MenuButtonContainer = styled.div`
  align-self: flex-end;
  position: sticky;
  top: 0;
  width: auto;
`;

export default Search;
