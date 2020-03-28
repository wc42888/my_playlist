import React from 'react';
import styled from 'styled-components';
import { LARGE_SIZE } from '../../typography/font';
import { BLUE } from '../../typography/color';

const AddNewListButton = () => {
  const onClick = (e) => {
    console.log('haha');
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
`;

export default AddNewListButton;
