import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import sideBarMenu from '../../util/sideBarMenu';

const regionalMenu = ['italian', 'french', 'irish'];
const naturalMenu = ['animal', 'flower'];
const seasonalMenu = ['christmas', 'valentine'];

const SideBarMenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const {
    handleItemClick,
    activeItem,
    handleProList,
  } = props;

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Regional
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        {sideBarMenu(regionalMenu, handleItemClick, activeItem, handleProList, '/regional')}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Natural
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        {sideBarMenu(naturalMenu, handleItemClick, activeItem, handleProList, '/natural')}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Seasonal
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
        {sideBarMenu(seasonalMenu, handleItemClick, activeItem, handleProList, '/seasonal')}
      </Accordion.Content>
    </Accordion>
  );
};

SideBarMenu.propTypes = {
  handleItemClick: PropTypes.func,
  activeItem: PropTypes.number,
  handleProList: PropTypes.func,
};

export default SideBarMenu;
