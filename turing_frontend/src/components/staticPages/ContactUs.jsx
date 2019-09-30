import React, {useState } from "react";
import PropTypes from "prop-types";
import {
  Grid, Header, List, Form, Segment,
  Message, Divider, Input, Card,
  TextArea, Container, CardContent
} from 'semantic-ui-react';
import { toast } from "react-toastify";
import { contactAdmin } from '../../actions/contact_admin';
import {connect} from 'react-redux';

const ContactUs = (props) => {
  const {contactAdmin} = props;
  const [inputs, setInputs] = useState(
    {
      email: "",
      firstName: "",
      lastName: "",
      organization: "",
      text: "",
      loading: false
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, ] = useState('');

  const handleChange = (event, { name, value }) => {
    event.persist();
    setInputs({ ...inputs, [name]: value });
  };

  const { email, firstName, lastName, text } = inputs;

  const notify = () => {
    toast.success(`You have successfully sent a message`, {
      position: toast.POSITION.TOP_RIGHT,
      className: "foo-bar",
      style: { color: "#5cb960" }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAdmin(email, text);
    } catch (e) {
      setLoading(false);
      setError('Sorry error occurred, Please try again')

    }
  };

  return (
    <React.Fragment>
      <Container>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={8}>
            <Segment basic>
              {/*<Header as="h1" style={{ fontSize: "3em", paddingTop: "2em" }}>*/}
              {/*  Contact us*/}
              {/*</Header>*/}
              <Header as="h3">
                Tell us how we can help and we’ll get in touch shortly.
              </Header>
            </Segment>
            <Card fluid>
              <CardContent>
                <Segment basic>
                  <Form
                    size="big"
                    onSubmit={handleSubmit}
                  >
                    {success && (
                      <Message compact color="green">
                        {success}
                      </Message>
                    )}

                    {error && (
                      <Message compact color="red">
                        {error}
                      </Message>
                    )}

                    <Form.Group widths="equal">
                      <Form.Field required>
                        <label>First name</label>
                        <Input
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                        />
                      </Form.Field>

                      <Form.Field required>
                        <label>Last name</label>
                        <Input
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Field required>
                      <label>Email</label>
                      <Input
                        name="email"
                        value={email}
                        id="email"
                        onChange={handleChange}
                      />
                    </Form.Field>

                    <Form.Field required>
                      <label>Message</label>
                      <TextArea
                        name="text"
                        value={text}
                        onChange={handleChange}
                      />
                    </Form.Field>

                    <Form.Button
                      color="pink"
                      disabled={!text || !email || !lastName || !firstName}
                      style={{ padding: "1.25em 4.5em" }}
                      type="submit"
                      fluid
                      size="large"
                      loading={loading}
                    >
                      Submit
                    </Form.Button>
                  </Form>
                </Segment>
              </CardContent>
            </Card>
          </Grid.Column>

          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            largeScreen={8}
            verticalAlign="top"
          >
            <Segment basic padded style={{ marginTop: "6em" }}>
              <List size="medium">
                <List.Item content="Nigeria" />
                <List.Item content="19 Adeyemi-Lawson Avenue" />
                <List.Item content="Lagos, Nigeria 00234" />
                <List.Item content="+234 806 558 3760" />
              </List>
              <Divider hidden />
              <Divider hidden />
              <List relaxed size="medium">
                <List.Item>
                  <List.Header color="">EMAIL</List.Header>
                  <List.Content>
                    <a href="mailto:enquiry@jetstreamafrica.com">
                      clementudensi@gmail.com
                    </a>
                  </List.Content>
                </List.Item>
              </List>

              <Divider hidden />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Container>
    </React.Fragment>
  );
};

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  ({ contact_admin }) => ({ contact_admin }),
  {contactAdmin}
)(ContactUs);
