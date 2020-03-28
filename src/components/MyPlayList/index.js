import React from 'react';
import { List } from 'immutable';
import styled from 'styled-components';
import PlaylistCard from './PlaylistCard';
import AddNewListButton from './AddNewListButton';

const MyPlayList = ({ userPlaylist = List([]) }) => {
  const renderAddNewList = () => (
    <ButtonSection>
      <AddNewListButton />
    </ButtonSection>
  );

  const renderPlaylists = () =>
    userPlaylist.size && (
      <PlaylistSection>
        <PlaylistCard playlist={userPlaylist.get(0)} />
      </PlaylistSection>
    );

  const renderHeader = () => <div>My playlists</div>;

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
