import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'querystring';
import styled from 'styled-components';
import { BLUE, WHITE, GREY } from '../typography/color';
import { NORMAL_SIZE } from '../typography/font';
import { getAuth, getToken } from '../lib/network';

const useRedirect = (setAuth) => {
  const location = useLocation();
  const history = useHistory();

  const search = parse(location.search);

  useEffect(() => {
    if (search['?code']) {
      const fetchToken = async (code) => {
        try {
          setAuth(true);
          const {
            data: {
              access_token: accessToken,
              expires_in: expires,
              refresh_token: refreshToken,
            },
          } = await getToken(code);

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem(
            'expires',
            moment().add(expires, 's').toISOString(),
          );
          localStorage.setItem('refreshToken', refreshToken);

          history.push('/playlist');
        } catch (error) {
          history.push('/login');
        }
      };
      fetchToken(search['?code']);
    }

    return () => {
      setAuth(false);
    };
  }, [search['?code']]);

  useEffect(() => {
    if (search['?error']) history.push('/login');
  }, [search['?error']]);
};

const Login = () => {
  const [isAuthenticating, setAuth] = useState(false);

  useRedirect(setAuth);

  const renderText = () => (isAuthenticating ? 'Authenticating' : 'Login');

  return (
    <Contaienr>
      <LoginButton href={getAuth()} isAuthenticating={isAuthenticating}>
        {renderText()}
      </LoginButton>
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
  pointer-events: ${(props) => (props.isAuthenticating ? 'none' : 'auto')};
  background-color: ${(props) =>
    props.isAuthenticating ? `${GREY}` : `${BLUE}`};
`;

export default Login;
