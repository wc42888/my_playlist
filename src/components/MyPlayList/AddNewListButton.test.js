import React from 'react';
import { shallow } from 'enzyme';
import AddNewListButton from './AddNewListButton';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('test AddNewListButton component', () => {
  const addNewListButton = shallow(<AddNewListButton />);

  it('should prompt the user and dispatch correct action onclick', () => {
    window.prompt = jest.fn().mockImplementationOnce(() => true);

    addNewListButton.simulate('click');
    expect(window.prompt).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
