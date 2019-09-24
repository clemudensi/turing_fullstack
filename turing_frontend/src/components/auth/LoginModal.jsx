import React from 'react';
import {
  Button, Modal,
} from 'semantic-ui-react';
import LoginForm from '../../containers/Login';

const LoginModal = () => (
  <Modal
    trigger={(
      <Button as="a" inverted style={{ marginLeft: '0.5em' }} color="pink">
      Log in
      </Button>
    )}
    centered
  >
    <Modal.Header>Log in to account </Modal.Header>
    <Modal.Content textAlign="center">
      <Modal.Description>
        <LoginForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default LoginModal;
