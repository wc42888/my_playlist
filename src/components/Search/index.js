import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import TrackCard from './TrackCard';
import { LIGHT_GREY } from '../../typography/color';

const Search = ({ userPlaylist }) => {
  const [searchResult, setSerchResult] = useState([]);
  const [searchText, setText] = useState('');

  const showSearchResult = () => searchResult.length;

  const renderTrackCards = () =>
    showSearchResult() ? (
      <TrackList>
        {searchResult.map((track) => (
          <TrackCard key={track.id} track={track} userPlaylist={userPlaylist} />
        ))}
      </TrackList>
    ) : null;

  const renderDivider = () => (showSearchResult() ? <Hr /> : null);

  return (
    <Container>
      <SearchBar
        setSerchResult={setSerchResult}
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
  width: 100%;
  overflow: scroll;
`;

const Hr = styled.div`
  border-top: 1pt solid ${LIGHT_GREY};
  width: 100%;
  margin-top: 5pt;
`;

export default Search;
