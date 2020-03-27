import React, { useEffect } from 'react';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'querystring';
import styled from 'styled-components';
import { BLUE, WHITE } from '../typography/color';
import { NORMAL_SIZE } from '../typography/font';
import { getAuth } from '../lib/network';

const useRedirect = () => {
  const location = useLocation();
  const history = useHistory();

  const hash = parse(location.hash);
  const search = parse(location.search);

  useEffect(() => {
    if (search['?error']) history.push('/login');

    if (hash['#access_token']) {
      localStorage.setItem('accessToken', hash['#access_token']);
      localStorage.setItem(
        'expires',
        moment().add(hash.expires_in, 's').format(),
      );
      history.push('/playlist');
    }
  }, []);
};

const Login = () => {
  useRedirect();

  return (
    <Contaienr>
      <LoginButton href={getAuth()}>Login</LoginButton>
    </Contaienr>
  );
};

const Contaienr = styled.div`
  display: flex;
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
