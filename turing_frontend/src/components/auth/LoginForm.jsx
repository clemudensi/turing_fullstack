import React from 'react';
import {
  Button, Form, Grid, Message, Segment,
} from 'semantic-ui-react';
import PropType from 'prop-types';
import {isEnabled, showInvalidInputError} from '../../util/formValidation';
import {Link} from 'react-router-dom';

const propTypes = {
  email: PropType.string,
  password: PropType.string,
  loading: PropType.bool,
  handleOnChange: PropType.func,
  errors: PropType.func,
  errorMsg: PropType.string,
  handleBlur: PropType.func,
  state: PropType.object,
  previousPage: PropType.string,
  handleSubmit: PropType.func
};

// eslint-disable-next-line react/display-name
const LoginForm = React.memo(({
  email,
  password,
  handleOnChange,
  handleSubmit,
  loading,
  errors,
  errorMsg,
  state,
  previousPage,
  handleBlur
}) => (
  <React.Fragment>
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 600 }}>
        {
          errorMsg ? <h4 className={'error-msg'}>{errorMsg}</h4> : null
        }
        <Form
          size="large"
          onSubmit={handleSubmit}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              onChange={handleOnChange}
              value={email}
              error={showInvalidInputError(
                'email',
                errors,
                state
              )}
              onBlur={handleBlur('email')}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleOnChange}
              value={password}
              error={showInvalidInputError(
                'password',
                errors,
                state
              )}
              onBlur={handleBlur('password')}
            />

            <Button
              color="pink"
              fluid
              size="large"
              type="submit"
              loading={loading}
              disabled={isEnabled(errors)}
            >
                Login
            </Button>
          </Segment>
        </Form>
        <Message>
            New to us?
          {' '}
          <Link to={{
            pathname: '/signup',
            state: {previousPage}
          }}>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </React.Fragment>)
);

LoginForm.propTypes = propTypes;

export default LoginForm;