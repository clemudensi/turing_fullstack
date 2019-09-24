import PropTypes from 'prop-types';
import React from 'react';
import MobileContainer from './MobileContainer';
import DesktopContainer from './DesktopContainer';
import HomeProductContainer from '../../containers/HomeProducts';

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <HomeProductContainer />
  </ResponsiveContainer>
);
export default HomepageLayout;
