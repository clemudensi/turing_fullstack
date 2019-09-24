import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const MyLoader = () => (
  <Dimmer active inverted>
    <Loader inline="centered" size="massive">
      Loading...
    </Loader>
  </Dimmer>
);

export default MyLoader;

