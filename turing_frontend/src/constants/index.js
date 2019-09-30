export const PRODUCTS = 'https://bjrossgq82.execute-api.us-east-1.amazonaws.com/dev/api/v1';
export const PAYMENT = 'https://3akws9d3ub.execute-api.us-east-1.amazonaws.com/dev/api/v1';
export const IMAGE = 'https://turingstore.s3.amazonaws.com/images';
export const AXIOSCONFIG = {
  headers: {'Authorization': sessionStorage.getItem('accessToken')}
};

export const TOKEN = sessionStorage.getItem('accessToken');
export const USERNAME = localStorage.getItem('username');
export const CUSTOMER_ID = localStorage.getItem('user_id');
export const IMAGE_URL = localStorage.getItem('image_url');
export const IMAGE_NAME = localStorage.getItem('image_name');


export const Attributes = [
  { key: '1', text: 'S', value: 1 },
  { key: '2', text: 'M', value: 2 },
  { key: '3', text: 'L', value: 3 },
  { key: '4', text: 'XL', value: 4 },
  { key: '5', text: 'XXL', value: 5 },
  { key: '6', text: 'White', value: 6 },
  { key: '7', text: 'Black', value: 7 },
  { key: '8', text: 'Red', value: 8 },
  { key: '9', text: 'Orange', value: 9 },
  { key: '10', text: 'Yellow', value: 10 },
  { key: '11', text: 'Green', value: 11 },
  { key: '12', text: 'Blue', value: 12 },
  { key: '13', text: 'Indigo', value: 13 },
  { key: '14', text: 'Purple', value: 14 },
];

export const Categories = [
  { key: 'french', text: 'French', value: 1 },
  { key: 'italian', text: 'Italian', value: 2 },
  { key: 'irish', text: 'Irish', value: 3 },
  { key: 'animal', text: 'Animal', value: 4 },
  { key: 'flower', text: 'Flower', value: 5 },
  { key: 'christmas', text: 'Christmas', value: 6 },
  { key: 'valentine', text: 'Valentine', value: 7 },
];

export const ShippingRegion = [
  { key: 'US/CA', text: 'US / Canada', value: 2 },
  { key: 'EU', text: 'Europe', value: 3 },
  { key: 'ROW', text: 'Rest of World', value: 4 },
];


export const ShippingOption = [
  { key:'ND', code: 2, text: 'Next Day Delivery ($20)', value: 'ND' },
  { key:'3-4D', code: 2, text: '3-4 Days ($10)', value: '3-4D' },
  { key:'7D', code: 2, text: '7 Days ($5)', value: '7D' },
  { key:'A7D', code: 3, text: 'By air (7 days, $25)', value: 'A7D' },
  { key:'S28D', code: 3, text: 'By sea (28 days, $10)', value: 'S28D' },
  { key:'A10D', code: 4, text: 'By air (10 days, $35)', value: 'A10D' },
  { key:'S28D2', code: 4, text: 'By sea (28 days, $30)', value: 'S28D2' },
];

export const TaxOption = [
  { key: 2, text: 'US/CA', value: 0 },
  { key: 3, text: 'EU', value: 8.50 },
  { key: 4, text: 'ROW', value: 8.50 },
];

export const ShippingValues = {
  'ND': {
    'shipping_cost': 20,
    'tax_cost': 0,
    'shipping_id': 1,
    'tax_id': 2
  },
  '3-4D': {
    'shipping_cost': 10,
    'tax_cost': 0,
    'shipping_id': 2,
    'tax_id': 2
  },
  '7D': {
    'shipping_cost': 5,
    'tax_cost': 0,
    'shipping_id': 3,
    'tax_id': 2
  },
  'A7D': {
    'shipping_cost': 25,
    'tax_cost': 8.5,
    'shipping_id': 4,
    'tax_id': 1
  },
  'S28D': {
    'shipping_cost': 10,
    'tax_cost': 8.5,
    'shipping_id': 5,
    'tax_id': 1
  },
  'A10D': {
    'shipping_cost': 20,
    'tax_cost': 35,
    'shipping_id': 6,
    'tax_id': 1
  },
  'S28D2': {
    'shipping_cost': 30,
    'tax_cost': 8.5,
    'shipping_id': 7,
    'tax_id': 1
  },
};


export const DEPARTMENT = {
  1: 'regional',
  2: 'nature',
  3: 'seasonal',
};
