import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import map from 'lodash/map';

export default (dataSidebarMenu, handleItemClick, activeItem, handleProList, matchUrl) => (
  map(dataSidebarMenu, (item, index) => {
    const itemMenu = item.replace(/-/g, ' ').replace(/^[a-z]?/, menu => menu.toUpperCase());
    const link = (
      <Link
        to={`${matchUrl}/${item}?page=1`}
      >
        {itemMenu}
      </Link>
    );
    return (
      <Menu.Item
        as="li"
        key={index}
        className={`sb-menu-item ${activeItem === item ? 'selected' : ''}`}
        onClick={() => {
          handleItemClick(item);
          handleProList(`${matchUrl}/${item}`, item);
        }}
      >
        {link}
      </Menu.Item>
    );
  })
);
