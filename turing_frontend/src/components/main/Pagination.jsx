import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Pagination } from 'semantic-ui-react';
import PropType from 'prop-types';
import Scroll from '../scroll/Scroll';

const propTypes = {
  page: PropType.number,
  currentPage: PropType.number,
};

class PaginationList extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    Scroll(290, 300);
 }

  render() {
    const {
      page,
      currentPage,
    } = this.props;
    // console.log(currentPage, page, 'Cure')
    const itemsPagination = [];

    for (let i = 0; i < page; i++) {
      const link = (<NavLink to={`?page=${i + 1}`}>{i + 1}</NavLink>);
      itemsPagination.push(
        <Menu.Item
          as="a"
          key={i}
          // className={ `page-item ${i + 1 === currentPage ? 'selected' : ''}`}
          className={'sb-menu-item' + ' ' + `${currentPage === i + 1 ? 'selected' : ''}`}
          onClick={()=>this.props.handlePagination(i +1)}
        >
          {link}
        </Menu.Item>,
      );
    }

    return (
      <Menu as="ul" className="page-bar sb-menu" pagination>
        <Pagination
          totalPages={page}
          onPageChange={(e, data)=>this.props.handlePagination(data)}
        />
      </Menu>
    );
  }
}

Pagination.propTypes = propTypes;

export default PaginationList;
