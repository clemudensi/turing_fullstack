import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const UploadImage = ({ uploadWidget }) => (
  <Fragment>
    <input type="button" value="upload image" onClick={uploadWidget}/>
  </Fragment>
);

UploadImage.propTypes = {
  uploadWidget: PropTypes.func,
};

export default UploadImage;