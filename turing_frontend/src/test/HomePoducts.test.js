import React from 'react';
import {Provider} from 'react-redux';
import { mount } from '../enzyme';
import configureMockStore from 'redux-mock-store';
import HomeProduct from '../containers/HomeProducts';
import {testData} from '../util/testData';

const mockStore = configureMockStore();
const store = mockStore({
  products: {
    data: testData
  }
});

describe('Should Render HomeProducts with Child Components', () => {

  const wrapper = mount(<Provider store={store}>
    <HomeProduct/>
  </Provider>);

  it('Home renders an item', () => {
    expect(wrapper.find('#product-list')).toBeDefined();
    expect(wrapper.find('#hot-products-items').length).toBeGreaterThan(0);
    expect(wrapper.find('.load-more-btn').exists()).toEqual(true);
    expect(wrapper.find('#hot-products').exists()).toEqual(true);

    expect(wrapper.find('ShowcaseHeader').length).toBeGreaterThan(0);
    expect(wrapper.find('ProductItem').length).toBeGreaterThan(0);
    expect(wrapper.find('Button').length).toBeGreaterThan(0);
  });

  it('should render ProductItem with props', () => {
    // expect(wrapper.find('ProductItem').props()).toHaveProperty('key');
    expect(wrapper.find('ProductItem').props()).toHaveProperty('id');
    expect(wrapper.find('ProductItem').props()).toHaveProperty('category');
  });

});
