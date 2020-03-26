import React from 'react';
import styled from 'styled-components';
import { BLUE, WHITE } from '../typography/color';
import { NORMAL_SIZE } from '../typography/font';
import { getAuth } from '../lib/network';

const Login = () => {
  return (
    <Contaienr>
      <LoginButton href={getAuth()}>Login</LoginButton>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 5em;
  width: 10em;
  border: 1 solid ${BLUE};
  border-radius: 5pt;
  background-color: ${BLUE};
  color: ${WHITE};
  font-size: ${NORMAL_SIZE};
`;

export default Login;
