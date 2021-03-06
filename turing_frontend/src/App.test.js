import React from 'react';
import { shallow } from 'enzyme';
import App from './components/app/App';

describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);

    expect(component).toMatchSnapshot();
  });
});