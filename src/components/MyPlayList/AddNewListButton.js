import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { LARGE_SIZE } from '../../typography/font';
import { BLUE, WHITE } from '../../typography/color';
import { postNewPlaylist } from '../../store/actions/playList';

const AddNewListButton = ({ userId }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    const newPlaylistName = prompt('Enter new play list name');

    if (newPlaylistName)
      dispatch(postNewPlaylist(userId, { name: newPlaylistName }));
  };

  return <Container onClick={onClick}>+</Container>;
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${LARGE_SIZE};
  height: ${LARGE_SIZE};
  font-size: ${LARGE_SIZE};
  border-radius: ${LARGE_SIZE};
  outline: none;
  background-color: ${BLUE};
  color: ${WHITE};
`;

export default AddNewListButton;
