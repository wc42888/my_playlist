import React, { useState as useStateMock } from 'react';
import { shallow } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import Login, { useAutoAuthenticate, useRedirect } from './Login';
import * as api from '../lib/network';

const mockHistory = jest.fn();
const mockLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => mockHistory,
  useLocation: () => mockLocation,
}));

jest.mock('../lib/network/api', () => ({
  getNewToken: jest.fn(),
}));

jest.mock('../lib/network/auth', () => ({
  getToken: jest.fn(),
  getAuth: jest.fn(),
}));

const tick = () => new Promise((resolve) => setImmediate(resolve));

describe('test Login component', () => {
  let login;
  const setAuth = jest.fn();

  beforeEach(() => {
    api.getAuth.mockImplementationOnce(() => 'https://someValidHref.com');
    useStateMock.mockImplementation((init) => [init, setAuth]);
    login = shallow(<Login />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a login button', () => {
    const loginButton = login.find('#loginButton');
    expect(loginButton.exists()).toBeTruthy();
    expect(loginButton.props().href).toBeDefined();
  });
});

describe('test useAutoAuthenticate hook', () => {
  const setAuth = jest.fn();
  const historyPush = jest.fn();
  const history = {
    push: historyPush,
  };

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the correct functions when get token success', async () => {
    api.getNewToken.mockImplementationOnce(
      () => new Promise((resolve) => resolve({})),
    );

    renderHook(() => useAutoAuthenticate(setAuth, history));

    await tick();

    expect(setAuth).toHaveBeenCalledTimes(2);
    expect(historyPush).toHaveBeenCalledWith('/playlist');
  });

  it('should call the correct when get token fails', async () => {
    api.getNewToken.mockImplementationOnce(
      () => new Promise((resolve, reject) => reject(Error())),
    );

    renderHook(() => useAutoAuthenticate(setAuth, history));

    await tick();

    expect(setAuth).toHaveBeenCalledTimes(2);
    expect(historyPush).not.toHaveBeenCalled();
  });
});

describe('test useRedirect hook', () => {
  let setAuth;
  let historyPush;
  let history;

  beforeEach(() => {
    setAuth = jest.fn();
    historyPush = jest.fn();
    history = {
      push: historyPush,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login when there is error', () => {
    const location = {
      search: '?error=someError',
    };

    renderHook(() => useRedirect(setAuth, location, history));

    expect(historyPush).toHaveBeenCalledWith('/login');
  });

  it('should redirect to playlist page when successfully getting a token', async () => {
    const location = {
      search: '?code=someCode',
    };

    api.getToken.mockImplementationOnce(
      () => new Promise((resolve) => resolve({ data: {} })),
    );
    renderHook(() => useRedirect(setAuth, location, history));

    await tick();

    expect(historyPush).toHaveBeenCalledWith('/playlist');
  });

  it('should redirect to login page when fail to fetch a token', async () => {
    const location = {
      search: '?code=someCode',
    };

    api.getToken.mockImplementationOnce(
      () => new Promise((resolve, reject) => reject(Error())),
    );
    renderHook(() => useRedirect(setAuth, location, history));

    await tick();

    expect(historyPush).toHaveBeenCalledWith('/login');
  });
});
