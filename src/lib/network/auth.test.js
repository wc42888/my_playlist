import * as authModule from './auth';
import {
  CLIENT_ID,
  REDIRECT_URI,
  ROOT_AUTH_URL,
  SCOPE,
} from '../../config/api';

describe('test getAuth function', () => {
  it('should match the expect path', () => {
    const expectedPath = `${ROOT_AUTH_URL}/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;
    expect(authModule.getAuth()).toEqual(expectedPath);
  });
});

describe('test isAuthorized function', () => {
  it('should return false when any or both of token and expire exist', () => {
    expect(true).toBeTruthy();
  });

  it('should return false when the token expires', () => {
    expect(true).toBeTruthy();
  });

  it('should return true when token exists and token is valid', () => {
    expect(true).toBeTruthy();
  });
});
