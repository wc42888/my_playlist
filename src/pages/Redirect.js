import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Redirect = () => {
  const history = useHistory();
  const goToMyList = () => history.push('/playlist');
  return (
    <Contaienr>
      <div>page not found</div>
      <button type="button" onClick={goToMyList}>
        click me to go to play list
      </button>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Redirect;
