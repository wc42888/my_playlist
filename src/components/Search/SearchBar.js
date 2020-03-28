import React from 'react';
import styled from 'styled-components';
import { NORMAL_SIZE } from '../../typography/font';
import { BLUE } from '../../typography/color';
import { getSearchResult } from '../../lib/network';

const SearchBar = ({ setText, searchText, dispatch }) => {
  const onChange = (e) => {
    setText(e.target.value);
    dispatch({ type: 'RESET_SEARCH_RESULT' });
  };

  const searchTracks = async () => {
    if (!searchText) return;
    const {
      data: {
        tracks: { items },
      },
    } = await getSearchResult(searchText);

    const searchResult = items.map(({ id, name, artists }) => ({
      id,
      name,
      artists: artists.map((artist) => artist.name),
    }));

    dispatch({ type: 'SET_SEARCH_RESULT', payload: { searchResult } });
  };

  const onKeyDown = async (e) => {
    if (e.key === 'Enter') {
      searchTracks();
    }
  };

  const renderInput = () => (
    <StyledInput
      type="text"
      placeholder="Search your track"
      value={searchText}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );

  const clearText = () => setText('');

  const renderActionButton = () =>
    searchText ? <ActionButton onClick={clearText}>clear</ActionButton> : null;

  return (
    <Container>
      {renderInput()}
      {renderActionButton()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 30pt;
  width: 100%;
  border: 1pt solid ${BLUE};
  border-radius: 4pt;
  align-items: center;
`;

const StyledInput = styled.input`
  display: flex;
  flex: 1;
  height: 16pt;
  outline: none;
  border: none;
  margin-left: 1em;
  font-size: ${NORMAL_SIZE};
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  font-size: ${NORMAL_SIZE};
  color: ${BLUE};
  padding-left: 1em;
  padding-right: 1em;
  height: 100%;
  outline: none;
`;

export default SearchBar;
