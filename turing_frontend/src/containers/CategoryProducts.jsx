import React, {useState, useEffect} from 'react';
import { Header, Dropdown, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../components/main/ProductList';
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

  const {
    products: { products, total },
    showcaseHeader, location, fetchProducts,
    history
  } = props;

  const params = new URLSearchParams(window.location.search);
  const selectedPage = params.get('page');
  let page;
  const [filter, setFilter] = useState('Best Match');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activePage, setActivePage] = useState(selectedPage);

  const category = location.pathname.split('/')[2];

  useEffect(() => {
    /* Fetch Category products*/
    setLoading(false);
    fetchProducts(selectedPage, category);
    if ( products === []) {
      setNotFound(true);
    }

    setLoading(false);
  }, [category, selectedPage]);


  const handleSelectSort = (e, { value }) => (
    setFilter(value)
  );

  const handlePagination = ({activePage}) => {
    setActivePage(activePage);
    setLoading(true);
    history.push(`?page=${activePage}`);
  };

  const filterHighestPrice = (arr) => {
    return arr.length <= 1 ? arr : filterHighestPrice(arr
      .slice(1)
      .filter(item => item.discounted_price >= arr[0].discounted_price))
      .concat(arr[0], filterHighestPrice(arr
        .slice(1).filter(item => item.discounted_price < arr[0].discounted_price)));
  };

  const filterLowestPrice = (arr) => {
    // Quick Sort
    return arr.length <= 1 ? arr : filterLowestPrice(arr
      .slice(1)
      .filter(item => item.discounted_price <= arr[0].discounted_price))
      .concat(arr[0], filterLowestPrice(arr
        .slice(1).filter(item => item.discounted_price > arr[0].discounted_price)));
  };

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

  const loadingComp = () => {
    return notFound === false ? <PageLoader/> : <h2>Product not found</h2>;
  };

  return (
    <React.Fragment>
      <Card fluid>
        <Card.Content>
          <div id="product-showcase">
            <Header as="h2" textAlign="left" content={category.toUpperCase()} />
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
              dataDisplay.length > 0 && loading === false ?
                <ProductList dataProducts={dataDisplay} data={dataDisplay}
                  page={page}
                  activePage={activePage}
                  currentPage={currentPage}
                  loading={loading}
                  handlePagination={handlePagination}
                /> :
                loadingComp()
            }
          </div>
        </Card.Content>
      </Card>
    </React.Fragment>
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
  products: PropTypes.array,
  total: PropTypes.number,
  location: PropTypes.object,
  fetchProducts: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.func)
};

export default connect(
  ({ products }) => ({ products }),
  { fetchProducts })(ProductContainer);
