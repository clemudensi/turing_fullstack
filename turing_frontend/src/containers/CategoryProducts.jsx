import React, {useState, useEffect} from 'react';
import { Header, Dropdown, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../components/main/ProductList';
import Pagination from '../components/main/Pagination';
import 'assets/style/main.scss';
import 'assets/style/product.scss';
import { fetchProducts } from '../actions/products';
import PageLoader from '../util/PageLoader';

const options = [
  { text: 'Best Match', value: 'Best Match' },
  { text: 'Lowest Price', value: 'Lowest Price' },
  { text: 'Highest Price', value: 'Highest Price' },
];

const ProductContainer = (props) => {
  const { products: { products, total } } = props;
  let { showcaseHeader, location, page } = props;
  const [filter, setFilter] = useState('Best Match');
  const [notFound, setNotFound] = useState(false);

  const handleSelectSort = (e, { value }) => (
    setFilter(value)
  );

  const filterHighestPrice = (arr) => {
    return arr.length <= 1 ? arr : filterHighestPrice(arr
      .slice(1)
      .filter(item => item.price >= arr[0].price))
      .concat(arr[0], filterHighestPrice(arr
        .slice(1).filter(item => item.price < arr[0].price)));
  };

  const filterLowestPrice = (arr) => {
    // Quick Sort
    return arr.length <= 1 ? arr : filterLowestPrice(arr
      .slice(1)
      .filter(item => item.price <= arr[0].price))
      .concat(arr[0], filterLowestPrice(arr
        .slice(1).filter(item => item.price > arr[0].price)));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const category = props.location.pathname.split('/')[2];

    /* Fetch Category products*/
    props.fetchProducts(page, category);
    if ( products === []) {
      setNotFound(true)
    }
  }, [showcaseHeader, page]);


  // Total Quantity of Products
  const itemsTotal = total;

  // Total Pages
  page = 0;

  if (itemsTotal <= 20) {
    page = 1;
  } else if (itemsTotal % 20 !== 0) {
    page = Math.floor(itemsTotal / 20) + 1;
  } else {
    page = itemsTotal / 20;
  }

  const currentPage = location.hash ? location.hash.substr(1) * 1 : 1;

  let dataDisplay;

  switch (filter) {
  case 'Best Match':
    dataDisplay = products;
    break;
  case 'Lowest Price':
    dataDisplay = filterLowestPrice(products.slice(0));
    break;
  case 'Highest Price':
    dataDisplay = filterHighestPrice(products.slice(0));
    break;
  default:
    dataDisplay = products;
  }

  dataDisplay = dataDisplay.slice((currentPage - 1) * 20, currentPage * 20);

  const loading = () => {
    return notFound === false ? <PageLoader/> : <h2>Product not found</h2>;
  };

  return (
    <div className="category-top">
      <Card fluid>
        <Card.Content>
          <div id="product-showcase">
            <Header as="h2" textAlign="left" content={showcaseHeader} />
            <div className="pro-filter-bar">
              <p className="total-num">
                <strong>Total</strong>
                {' '}
                {itemsTotal}
                {' '}
                Items
              </p>
              <Dropdown
                className="filter-menu"
                defaultValue="Best Match"
                options={options}
                selection
                item
                onChange={handleSelectSort}
              />
            </div>
            {
              dataDisplay.length > 0 ?
                <ProductList dataProducts={dataDisplay} data={dataDisplay} /> :
                loading()
            }
            <Pagination
              page={page}
              currentPage={currentPage}
              handlePagination={props.handlePagination}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

ProductContainer.defaultProps = {
  products: {
    products: []
  },
  location: {
    pathname: ''
  }
};

ProductContainer.propTypes = {
  dataProducts: PropTypes.array,
  showcaseHeader: PropTypes.string,
};

export default connect(
  ({ products }) => ({ products }),
  { fetchProducts },
)(ProductContainer);
