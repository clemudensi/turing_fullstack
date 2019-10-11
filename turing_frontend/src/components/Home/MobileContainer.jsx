import React, {useState } from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Icon, List, Menu, Responsive, Segment, Sidebar} from 'semantic-ui-react';
import HomepageHeading from './HomepageHeading';
import {NavLink} from "react-router-dom";

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const MobileContainer = (props) => {
  const { children } = props;
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(!sidebarOpened);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        <List link inverted>
          <List.Item as="ul"><NavLink to="/">Home</NavLink></List.Item>
          <List.Item as="ul"><NavLink to="/contact">Contact</NavLink></List.Item>
          <List.Item as="ul"><NavLink to="/about">Others</NavLink></List.Item>
          <List.Item as="ul">FAQ</List.Item>
        </List>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 350, padding: '1em 0em' }}
          vertical
        >
          <Menu inverted pointing secondary size='large'>
            <Menu.Item onClick={handleToggle}>
              <Icon name='sidebar' />
            </Menu.Item>
            {/*<Menu.Item position='right'>*/}
            {/*  <Button as='a' inverted>*/}
            {/*    Log in*/}
            {/*  </Button>*/}
            {/*  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>*/}
            {/*    Sign Up*/}
            {/*  </Button>*/}
            {/*</Menu.Item>*/}
          </Menu>
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
};

export default MobileContainer;

MobileContainer.propTypes = {
  children: PropTypes.node,
};