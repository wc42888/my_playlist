import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { isAuthorized } from '../lib/network';
import { MyPlayList, Search } from '../components';
import { GREY } from '../typography/color';
import { getUserProfile } from '../store/actions/userProfile';
import { getUserPlaylists } from '../store/actions/playList';
import Header from '../components/Header';
import { getAllUserPlaylist } from '../selectors';

const useFetchInitialData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserPlaylists());
  }, []);
};

const PlayList = () => {
  useFetchInitialData();

  const userProfile = useSelector((state) => state.get('userProfile'));
  const userPlaylist = useSelector(getAllUserPlaylist);

  const renderPlaylistSection = () => (
    <MyPlayListSection>
      <MyPlayList userPlaylist={userPlaylist} userId={userProfile.get('id')} />
    </MyPlayListSection>
  );

  const renderSearchTrackSection = () => (
    <SearchMusicSection>
      <Search userPlaylist={userPlaylist} />
    </SearchMusicSection>
  );

  const renderPlayList = () => (
    <>
      <Header userName={userProfile.get('displayName')} />
      <Container>
        {renderPlaylistSection()}
        {renderSearchTrackSection()}
      </Container>
    </>
  );

  return isAuthorized() ? renderPlayList() : <Redirect to="/login" />;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10pt;
  border: 1pt solid ${GREY};
  height: 100vh;
  border-radius: 10pt;
`;

const MyPlayListSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  border-right: 1pt solid ${GREY};
`;

const SearchMusicSection = styled.div`
  display: flex;
  flex: 2;
`;

export default PlayList;
