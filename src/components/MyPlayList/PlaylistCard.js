import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { NORMAL_SIZE, LARGE_SIZE } from '../../typography/font';
import { GREY, BLUE } from '../../typography/color';
import { getTracksForPlaylist } from '../../store/actions/tracks';
import { getAllTracksForPlaylist } from '../../selectors';

const PlaylistCard = ({ playlist }) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const getAllTracksForPlaylistValue = useMemo(getAllTracksForPlaylist, []);

  useEffect(() => {
    if (expand) dispatch(getTracksForPlaylist(playlist.get('id')));
  }, [expand]);

  const tracks =
    useSelector((state) =>
      getAllTracksForPlaylistValue(state, playlist.get('tracks') || []),
    ) || [];

  const renderTracks = () =>
    expand && tracks.size ? (
      <TrackSection id="trackSection">
        {tracks.map((track, index) => (
          <Track key={`${track.id} ${index + 1}`}>{`${index + 1}: ${
            track.name
          }`}</Track>
        ))}
      </TrackSection>
    ) : null;

  const renderIcon = () => (expand ? '-' : '+');

  const renderPlaylistInfo = () => (
    <PlaylistInfo>
      <InfoSection />
      <InfoSection id="playlistName">{playlist.get('name')}</InfoSection>
      <IconSection>{renderIcon()}</IconSection>
    </PlaylistInfo>
  );

  return (
    <Container id="cardContainer" onClick={() => setExpand(!expand)}>
      {renderPlaylistInfo()}
      {renderTracks()}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${GREY};
  width: 100%;
  font-size: ${NORMAL_SIZE};
  min-height: ${LARGE_SIZE};
  border-radius: 5pt;
  margin-top: 3pt;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: ${LARGE_SIZE};
  width: 100%;
  align-items: center;
`;

export const InfoSection = styled.div`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconSection = styled(InfoSection)`
  color: ${BLUE};
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
