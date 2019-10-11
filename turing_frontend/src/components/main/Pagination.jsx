import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PaginationList = (props) => {
  const {
    page,
    currentPage,
    activePage,
    handlePagination
  } = props;

  const itemsPagination = [];

  for (let i = 0; i < page; i++) {
    const link = (<NavLink to={`?page=${i + 1}`}>{i + 1}</NavLink>);
    itemsPagination.push(
      <Menu.Item
        as="a"
        key={i}
        className={`sb-menu-item ${currentPage === i + 1 ? 'selected' : ''}`}
        onClick={()=>handlePagination(i +1)}
      >
        {link}
      </Menu.Item>
    );
  }

  return (
    <Menu as="ul" className="page-bar sb-menu" pagination>
      <Pagination
        activePage={activePage}
        totalPages={page}
        onPageChange={(e, data)=>handlePagination(data)}
      />
    </Menu>
  );
};


PaginationList.propTypes = {
  page: PropTypes.number,
  currentPage: PropTypes.number,
  activePage: PropTypes.number,
  handlePagination: PropTypes.func,
};

export default PaginationList;
