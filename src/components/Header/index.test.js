import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('test Header component', () => {
  it('shoud render default text when the username props is missing', () => {
    const header = shallow(<Header />);
    expect(header.text()).toBe('Hello ');
  });

  it('should render the username props being passing into the component', () => {
    const userName = 'userName';
    const header = shallow(<Header userName={userName} />);
    expect(header.text()).toBe(`Hello ${userName}`);
  });
});
