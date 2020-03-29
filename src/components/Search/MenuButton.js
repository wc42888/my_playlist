import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NORMAL_SIZE } from '../../typography/font';
import { WHITE, BLUE, RED, LIGHT_GREY, GREY } from '../../typography/color';
import { postTracksToPlaylist } from '../../store/actions/tracks';

const buttonWidth = '32pt';
const selectedNumWidth = '12pt';

const MenuButton = ({ selectedTracks, userPlaylist, clearSelected }) => {
  const [showOption, setShowOption] = useState(false);
  const dispatch = useDispatch();

  const renderNumOfSelected = () => (
    <SelectedNum>{selectedTracks.size}</SelectedNum>
  );

  const dispatchToPlaylist = (playlistId) => {
    dispatch(
      postTracksToPlaylist(
        playlistId,
        selectedTracks.map((track) => ({
          id: track.get('id'),
          name: track.get('name'),
        })),
      ),
    );
    clearSelected();
  };

  const renderOption = () =>
    showOption && (
      <OptionSection>
        {userPlaylist.map((playlist) => (
          <PlaylistOption
            key={playlist.get('id')}
            onClick={() => dispatchToPlaylist(playlist.get('id'))}
          >
            {playlist.get('name')}
          </PlaylistOption>
        ))}
      </OptionSection>
    );

  const toggleOption = () => setShowOption(!showOption);

  const dismissOption = () => setShowOption(false);

  return (
    <Container onClick={toggleOption} onMouseLeave={dismissOption}>
      {'+'}
      {renderNumOfSelected()}
      {renderOption()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${buttonWidth};
  height: ${buttonWidth};
  border-radius: ${buttonWidth};
  font-size: ${NORMAL_SIZE};
  background-color: ${BLUE};
  color: ${WHITE};
`;

const SelectedNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: ${selectedNumWidth};
  height: ${selectedNumWidth};
  border-radius: ${selectedNumWidth};
  background-color: ${RED};
`;

const OptionSection = styled.div`
  position: absolute;
  color: black;
  background-color: ${GREY};
  top: ${buttonWidth};
  left: 0;
`;

const PlaylistOption = styled.div`
  margin: 5pt;
  font-size: ${NORMAL_SIZE};
  height: 20pt;
  text-align: left;
  &:hover {
    background-color: ${LIGHT_GREY};
    color: black;
  }
  width: 100pt;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MenuButton;
