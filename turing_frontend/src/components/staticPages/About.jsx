import React from 'react';
import {Container, Card, Header, Segment} from 'semantic-ui-react';

const About = () => (
  <Container>
    <div className="full-page">
      <Segment basic>
        <Header as="h3">
          About Us
        </Header>
      </Segment>
      <Card
        fluid
        // header='Elliot Baker'
        // meta='Friend'
        description='This is Turing T-shirt store, where you get exclusive t-shirt brand and unique design that stands out'
      />
    </div>
  </Container>
);

export default About;