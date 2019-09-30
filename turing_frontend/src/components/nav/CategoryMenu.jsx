import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SideBarMenu from '../menu/SideBarMenu';

const CategoryMenu = (props) => {
  const { location: { pathname }, handleProList} = props;
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  useEffect(()=> {
    const arrPathname = pathname.match(/\/[a-z\-]+/g);
    if (arrPathname.length === 2) {
      handleItemClick(arrPathname[1].substr(1));
      handleProList(pathname, arrPathname[1].substr(1));
    }
  }, []);

  return (
    <Menu as="ul" className="sb-menu" text vertical>
      <Menu.Item as="li" className="sb-menu-item" header>PRODUCT CATEGORY</Menu.Item>
      {/*{categoryMenu}*/}
      <SideBarMenu
        handleItemClick={handleItemClick}
        activeItem={activeItem}
        handleProList={handleProList}
      />
      <br />
    </Menu>
  );
};

export default CategoryMenu;

CategoryMenu.propTypes = {
  handleProList: PropTypes.func,
  pathname: PropTypes.string
};
