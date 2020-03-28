import React, { useState } from 'react';
import styled from 'styled-components';
import { NORMAL_SIZE } from '../../typography/font';
import { BLUE } from '../../typography/color';

const SearchBar = () => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const renderInput = () => (
    <StyledInput
      type="text"
      placeholder="Search your track"
      value={text}
      onChange={onChange}
    />
  );

  const renderActionButton = () => (
    <ActionButton>{text ? 'clear' : 'search'}</ActionButton>
  );

  return (
    <Container>
      {renderInput()}
      {renderActionButton()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 30pt;
  width: 100%;
  border: 1pt solid ${BLUE};
  border-radius: 4pt;
  align-items: center;
`;

const StyledInput = styled.input`
  display: flex;
  flex: 1;
  height: 16pt;
  outline: none;
  border: none;
  margin-left: 1em;
  font-size: ${NORMAL_SIZE};
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  font-size: ${NORMAL_SIZE};
  color: ${BLUE};
  padding-left: 1em;
  padding-right: 1em;
  height: 100%;
  outline: none;
`;

export default SearchBar;
