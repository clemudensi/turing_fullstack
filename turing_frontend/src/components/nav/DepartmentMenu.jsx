import React, {useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import '../../assets/style/header.scss';

const departmentMenu = ['regional', 'natural', 'seasonal'];

const DepartmentMenu = () => {
  const [activeItem, setActiveItem] = useState('regional');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const listMenu = departmentMenu.map((item, index) => (
    <Menu.Item
      as="ul"
      className="sb-menu-item nav-item"
      header
      key={index}
      active={activeItem === item}
      onClick={handleItemClick}
    >
      <NavLink
        to={`/${item}`}
        activeClassName="active"
      >
        {item.toUpperCase()}
      </NavLink>
    </Menu.Item>
  ));

  return (
    <Menu as="ul" className="sb-menu" text vertical>
      <Menu.Item as="li" className="sb-menu-item" header>PRODUCT DEPARTMENT</Menu.Item>
      {listMenu}
      <br />
    </Menu>
  );
};

export default DepartmentMenu;
