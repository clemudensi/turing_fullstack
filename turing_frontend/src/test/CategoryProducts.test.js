import React from 'react';
import {Provider} from 'react-redux';
import {shallow, mount, toJson} from '../enzyme';
import configureMockStore from 'redux-mock-store';
import CategoryProducts from '../containers/CategoryProducts';
import {testData} from '../util/testData';

const mockStore = configureMockStore();
const store = mockStore({
  products: {
    products: testData
  }
});

describe('CategoryProducts with Sub-Components',  () => {
  let wrapper = mount(
    <Provider store={store}>
      <CategoryProducts />
    </Provider>
  );

  it('should render CategoryProducts', () => {
    expect(wrapper.find('#product-showcase')).toBeDefined();
    expect(wrapper.find('.pro-filter-bar').length).toBeGreaterThan(0);
    expect(wrapper.find('.filter-menu').exists()).toEqual(true);

    expect(wrapper.find('Pagination').length).toBeGreaterThan(0);
    expect(wrapper.find('Dropdown').length).toBeGreaterThan(0);
    expect(wrapper.find('ProductList').length).toBeGreaterThan(0);
  });

  it('should render Dropdown prop', () => {
    expect(wrapper.find('Dropdown').props().defaultValue).toEqual('Best Match');
    expect(wrapper.find('Dropdown').props().selection).toEqual(true);
    expect(wrapper.find('Dropdown').props().item).toEqual(true);
    expect(wrapper.find('Dropdown').props().onChange).toBeInstanceOf( Function );
  });

  it('should render ProductList prop', () => {
    expect(wrapper.find('ProductList').props().dataProducts).toBeDefined();
    expect(wrapper.find('ProductList').props().data).toBeDefined();
  });

  it('should render Pagination prop', () => {
    expect(wrapper.find('Pagination').props()).toHaveProperty('page');
    expect(wrapper.find('Pagination').props().currentPage).toEqual(1);
    expect(wrapper.find('Pagination').props()).toHaveProperty('handlePagination');
  });

});