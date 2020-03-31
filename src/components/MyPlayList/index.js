import React from 'react';
import { List } from 'immutable';
import styled from 'styled-components';
import PlaylistCard from './PlaylistCard';
import AddNewListButton from './AddNewListButton';

const MyPlayList = ({ userPlaylist = List([]), userId = '' }) => {
  const renderAddNewList = () => (
    <ButtonSection id="buttonSection">
      <AddNewListButton id="button" userId={userId} />
    </ButtonSection>
  );

  const renderPlaylists = () =>
    userPlaylist.size ? (
      <PlaylistSection id="playlistSection">
        {userPlaylist.map((playlist) => (
          <PlaylistCard key={playlist.get('id')} playlist={playlist} />
        ))}
      </PlaylistSection>
    ) : null;

  const renderHeader = () => <div id="header">My playlists</div>;

  return (
    <Container>
      {renderHeader()}
      {renderPlaylists()}
      {renderAddNewList()}
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

const PlaylistSection = styled.div`
  width: 100%;
  margin-top: 10pt;
`;

const ButtonSection = styled.div`
  position: sticky;
  margin-top: 10pt;
  button: 0;
`;

export default MyPlayList;
