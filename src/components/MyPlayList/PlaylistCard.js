import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NORMAL_SIZE, LARGE_SIZE } from '../../typography/font';
import { GREY } from '../../typography/color';
import { getTracksForPlaylist } from '../../store/actions/tracks';
import { getAllTracksForPlaylist } from '../../selectors';

const PlaylistCard = ({ playlist }) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const getAllTracksForPlaylistValue = useMemo(getAllTracksForPlaylist, []);

  useEffect(() => {
    if (expand) dispatch(getTracksForPlaylist(playlist.id));
  }, [expand]);

  const tracks =
    useSelector((state) =>
      getAllTracksForPlaylistValue(state, playlist.tracks || []),
    ) || [];

  const renderTracks = () =>
    expand &&
    tracks.size && (
      <TrackSection>
        {tracks.map((track, index) => (
          <Track key={track.id}>{`${index + 1}: ${track.name}`}</Track>
        ))}
      </TrackSection>
    );

  const renderIcon = () => (expand ? '-' : '+');

  const renderPlaylistInfo = () => (
    <PlaylistInfo>
      <InfoSection />
      <InfoSection>{playlist.name}</InfoSection>
      <InfoSection>{renderIcon()}</InfoSection>
    </PlaylistInfo>
  );

  return (
    <Container onClick={() => setExpand(!expand)}>
      {renderPlaylistInfo()}
      {renderTracks()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${GREY};
  width: 100%;
  font: ${NORMAL_SIZE};
  min-height: ${LARGE_SIZE};
  border-radius: 5pt;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: ${LARGE_SIZE};
  width: 100%;
  align-items: center;
`;

const InfoSection = styled.div`
  flex: 1;
  text-align: center;
`;

const TrackSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1pt solid ${GREY};
  width: 100%;
`;

const Track = styled.div`
  padding: 3pt;
`;

export default PlaylistCard;
