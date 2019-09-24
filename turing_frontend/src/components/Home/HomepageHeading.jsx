import React from 'react';
import PropTypes from 'prop-types';

import BannerCarousel from '../carousel/BannerCarousel';

/* eslint-disable react/no-multi-comp */

const HomepageHeading = ({ mobile }) => (
  <BannerCarousel />
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

export default HomepageHeading;
