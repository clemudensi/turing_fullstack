import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Card, Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SidebarMenu from '../nav/CategoryMenu';
import CategoryProducts from '../../containers/CategoryProducts';
import '../../assets/style/main.scss';
import SearchProduct from '../nav/SearchProducts';

//Banner for Category pages
const CategoryBanner = props => {
  const category = ['/regional', '/natural', '/seasonal'];
  return category.includes(`${props.bannerPath}`) ? (
    <img src={require('../../assets/img' + props.bannerPath + 'Banner.jpg')} alt="Banner"/>
  ) : <img src={require('../../assets/img/notFound.jpg')} alt="Banner" height={600} width={1000}
    className={'center-div'}/>;
};

const ProductDepartment = (props) => {
  const {location, history, match} = props;
  const [dataProducts, setDataProducts] = useState([]);
  const [nameProList, setNameProList] = useState('');
  const [page, setPage] = useState(null);

  const handleProList = (path, nameProList) => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    setNameProList(nameProList.toUpperCase());
    setPage(page);
  };

  const handlePagination = ({activePage}) => {
    setPage(activePage);
    history.push(`?page=${activePage}`);
  };

  const currentPath = match.url;
  return (
    <Grid id="main-wrap">
      <Card>
        <Card.Content>
          <Grid.Column as="aside" width={3} textAlign="left">
            <SearchProduct
              location={location}
              history={history}
              fluid
            />
            <Route>
              {({match, location}) => (
                <SidebarMenu match={match} location={location} handleProList={handleProList}/>
              )}
            </Route>
          </Grid.Column>
        </Card.Content>
      </Card>
      <Grid.Column as="section" width={10}>
        <Switch>
          <Route
            exact
            path={`${currentPath}/*`}
          >
            {({match, location}) => (
              <CategoryProducts
                location={location}
                dataProducts={dataProducts}
                showcaseHeader={nameProList}
                page={page}
                handlePagination={handlePagination}
                {...props}
              />
            )}
          </Route>
          <Route
            exact
            path={currentPath}
          >
            <CategoryBanner bannerPath={currentPath}/>
          </Route>
        </Switch>
      </Grid.Column>
    </Grid>
  );
};

CategoryBanner.propTypes = {
  bannerPath: PropTypes.string,
};

ProductDepartment.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

export default ProductDepartment;
