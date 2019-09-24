import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

const ShowcaseHeader = (props) => {

  const {
    iconHeader,
    headerMain,
    headerSub
  } = props;

  let showIcon = null;

  if (iconHeader) {
    showIcon = (<Icon name={iconHeader} />);
  }

  return(
    <Header
      as='h2'
      textAlign='center'
      icon
    >
      {showIcon}
      {headerMain}
      <Header.Subheader>
        {headerSub}
      </Header.Subheader>
    </Header>
  );
};

ShowcaseHeader.propTypes = {
  iconHeader: PropTypes.string,
  headerMain: PropTypes.string.isRequired,
  headerSub: PropTypes.string
};

export default ShowcaseHeader;
