import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const UploadImage = ({ fileName, selectImage, loadingImage, loadingStatus, sendImage }) => (
  <Fragment>
    <Form>
      <Form.Field>
        <input type="file" name="file" onChange={selectImage} onBlur={sendImage} />
        <h6>{fileName}</h6>
        {loadingImage ? <p>loading....</p> : null}
        {loadingStatus ? <p>Completed</p> : null}
      </Form.Field>
    </Form>
  </Fragment>
);

UploadImage.propTypes = {
  selectImage: PropTypes.func,
  sendImage: PropTypes.func,
  fileName: PropTypes.string,
  loadingImage: PropTypes.bool,
  loadingStatus: PropTypes.bool,
};

export default UploadImage;