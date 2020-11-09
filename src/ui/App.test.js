import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json'
import App from './App';


describe('App component', () => {
  const wrapper= shallow(<App />);

  it('renders app without crashing', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should have a top main heading of \'Kelisto\'', () => {
    expect(wrapper.find('h1').text()).toBe('Kelisto');
  });

  it('should have a wrapping container class named `wrapper`', () => {
    expect(wrapper.find('.wrapper').length).toBe(1);
  });

  it('should have "loading" set to true by default', () => {
    expect(wrapper.state('loading')).toBe(true);
  });

  it('should have class "keloading" within wrapper container', () => {
      expect(wrapper.find('.keloading').length).toBe(1);
  })







});
