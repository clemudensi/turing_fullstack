import React from 'react';
import {Provider} from 'react-redux';
import {mount} from '../enzyme';
import configureMockStore from 'redux-mock-store';
import ProductInfo from '../containers/ProductInfo';

const mockStore = configureMockStore();
const store = mockStore({});


describe('Renders ProductInfo Component', () => {

  const wrapper = mount(<ProductInfo store={store} />);
  it('Should render productInfo', () => {
    expect(wrapper.find('#product-info')).toBeDefined();
    expect(wrapper.find('#product-info').length).toBeGreaterThan(0);
    expect(wrapper.find('ProductHeader')).toHaveLength(1);
    expect(wrapper.find('ProductSize')).toHaveLength(1);
    expect(wrapper.find('ProductColor')).toHaveLength(1);
    expect(wrapper.find('ProductQuantity')).toHaveLength(1);
    expect(wrapper.find('ProductDetail')).toHaveLength(1);
    expect(wrapper.find('#product-info').exists()).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ProductHeader with props', () => {
    expect(wrapper.find('ProductHeader').props()).toHaveProperty('salePrice');
    expect(wrapper.find('ProductHeader').props()).toHaveProperty('price');
    expect(wrapper.find('ProductHeader').props()).toHaveProperty('name');
  });

  it('should render ProductSize with props', () => {
    expect(wrapper.find('ProductSize').props()).toHaveProperty('dataSize');
    expect(wrapper.find('ProductSize').props()).toHaveProperty('selectedSize');
    expect(wrapper.find('ProductSize').props()).toHaveProperty('handleSelectSize');
  });

  it('should render ProductColor with props', () => {
    expect(wrapper.find('ProductColor').props()).toHaveProperty('dataColor');
    expect(wrapper.find('ProductColor').props()).toHaveProperty('selectedColor');
    expect(wrapper.find('ProductColor').props()).toHaveProperty('handleSelectColor');
  });

  it('should render ProductQuantity with props', () => {
    expect(wrapper.find('ProductQuantity').props()).toHaveProperty('handleChange');
    expect(wrapper.find('ProductQuantity').props()).toHaveProperty('quantity');
  });

  it('should render ProductDetail with props', () => {
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('dataDes');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('canAddToCart');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('hasSelected');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('handleAddToCart');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('handleAddOnceToCart');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('proInfo');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('cart');
    expect(wrapper.find('ProductDetail').props()).toHaveProperty('history');
  });
});