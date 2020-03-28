import React, { useState } from 'react';
import styled from 'styled-components';
import { BLUE, LIGHT_GREY } from '../../typography/color';
import { NORMAL_SIZE } from '../../typography/font';

const TrackCard = ({ track, userPlaylist }) => {
  const [showOption, setShowOption] = useState(false);

  const renderTrackContent = () =>
    `${track.name} (by ${track.artists.join(', ')})`;

  const renderOption = () =>
    showOption && (
      <OptionSection>
        <div>add track to:</div>
        <Option>
          {userPlaylist.map((playlist) => (
            <PlaylistOption key={playlist.get('id')}>
              {playlist.get('name')}
            </PlaylistOption>
          ))}
        </Option>
      </OptionSection>
    );

  const toggleOption = () => setShowOption(!showOption);

  const dismissOption = () => setShowOption(false);

  return (
    <Container onClick={toggleOption} onMouseLeave={dismissOption}>
      {renderTrackContent()}
      {renderOption()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 32pt;
  font-size: ${NORMAL_SIZE};
  margin-top: 5pt;
  line-height: 32pt;

  &:hover {
    background-color: ${BLUE};
    color: white;
  }
`;

const OptionSection = styled.div`
  position: relative;
  color: black;
  background-color: white;
`;

const PlaylistOption = styled.div`
  &:hover {
    background-color: ${LIGHT_GREY};
    color: black;
  }
`;

const Option = styled.div`
  padding-left: 5pt;
  color: black;
  width: 100%;
  background-color: white;
`;

export default TrackCard;
