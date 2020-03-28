import React from 'react';
import styled from 'styled-components';
import { BLUE, GREEN } from '../../typography/color';
import { NORMAL_SIZE } from '../../typography/font';

const TrackCard = ({ track, dispatch }) => {
  const renderTrackContent = () =>
    `${track.get('name')} (by ${track.get('artists').join(', ')})`;

  const selectTrack = () =>
    dispatch({
      type: 'TOGGLE_SELECTED_TRACK',
      payload: { id: track.get('id') },
    });

  return (
    <Container onClick={selectTrack} track={track}>
      {renderTrackContent()}
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

  background-color: ${(props) => (props.track.get('selected') ? GREEN : null)};
`;

export default TrackCard;
