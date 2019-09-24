import React from 'react';
import {
  Button, Modal,
} from 'semantic-ui-react';
import SignUpForm from './SignUpForm';

const Login = () => (
  <Modal
    trigger={(
      <Button as="a" style={{ marginLeft: '0.5em' }} color="pink">
        Sign Up
      </Button>
    )}
    centered
  >
    <Modal.Header>Sign up</Modal.Header>
    <Modal.Content textAlign="center">
      <Modal.Description>
        <SignUpForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default Login;
