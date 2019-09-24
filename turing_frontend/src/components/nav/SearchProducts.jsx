import _ from 'lodash'
import React, {useState, useEffect } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {searchProducts} from '../../actions/search_products'
import {IMAGE} from '../../constants';
import { DEPARTMENT } from '../../constants';

const initialState = { isLoading: false, results: [], value: '', products: []};

const SearchProduct = (props) => {
  const {history, searchProducts, search_products: { data }} = props;
  const [state, setState] = useState(initialState);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  const handleResultSelect = (e, { result }) =>
    history
      .push(`/${DEPARTMENT[result.department]}/${result.category}/${result.product_id}`);

  //map product search result
  const products =  _.map(data, product => ({
    title: product.name,
    description: (product.description).slice(0, 30) + '....',
    image: (<img src={`${IMAGE}/${product.image}`} alt={'item-display'}/>),
    price: product.price,
    category: product.categories[0].name,
    department: product.categories[0].department_id,
    product_id: product.product_id
  }));

  const re = new RegExp(_.escapeRegExp(value), 'i');
  const isMatch = result => re.test(result.title);

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true);
    setValue(value);

    setTimeout(async () => {
      if (value.length < 1) return setState(initialState);

      //dispatch props
      await searchProducts(value);

      setIsLoading(false);
      setResults(_.filter(products, isMatch) || 'Loading...');
    }, 500)
  };

  useEffect(() => {
    setResults(products || 'Loading...');
  }, [data]);

  return (
    <div className="center-div">
      <Search
        fluid
        className='search-bar'
        icon="search"
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 200, {
          loading: true,
        })}
        results={results}
        size={`mini`}
        value={value}
        {...props}
      />
    </div>
  )
};

export default connect(
  ({ search_products }) => ({ search_products }),
  {searchProducts}
)(SearchProduct)