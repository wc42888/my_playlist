import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'querystring';
import styled from 'styled-components';
import { BLUE, WHITE, GREY } from '../typography/color';
import { NORMAL_SIZE } from '../typography/font';
import { getAuth, getToken, getNewToken } from '../lib/network';

const useRedirect = (setAuth, location, history) => {
  const search = parse(location.search);

  const callbackCode = search['?code'];
  const callbackError = search['?error'];

  useEffect(() => {
    if (callbackError) history.push('/login');

    if (callbackCode) {
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
          localStorage.setItem('expires', moment().add(expires, 's').format());
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
  });
};

const useAutoAuthenticate = (setAuth, history) => {
  useEffect(() => {
    setAuth(true);

    const getNewAccessToken = async () => {
      try {
        await getNewToken();
        setAuth(false);
        history.push('/playlist');
      } catch (error) {
        setAuth(false);
      }
    };

    getNewAccessToken();
  }, []);
};

const Login = () => {
  const [isAuthenticating, setAuth] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useAutoAuthenticate(setAuth, history);

  useRedirect(setAuth, location, history);

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
