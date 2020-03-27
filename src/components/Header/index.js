import React from 'react';
import styled from 'styled-components';
import { LARGE_SIZE } from '../../typography/font';
import { GREY } from '../../typography/color';

const Header = ({ userName }) => (
  <Container>{`Hello ${userName || ''}`}</Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  border-radius: 10pt;
  height: ${LARGE_SIZE};
  font-size: ${LARGE_SIZE};
  margin: 10pt;
  border: 1pt solid ${GREY};
  justify-content: center;
  align-items: center;
`;

export default Header;
