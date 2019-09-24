import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const PageLoader = () => (
  <div className="full-page">
    <Dimmer active inverted>
      <Loader inline="centered" size="massive">
        Loading...
      </Loader>
    </Dimmer>
  </div>
)

export default PageLoader;
