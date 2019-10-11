import React from 'react';
import {Form, Button, Grid, Segment, Message} from 'semantic-ui-react';
import PropType from 'prop-types';
import {isEnabled, showInvalidInputError} from '../../util/formValidation';
import {Link} from 'react-router-dom';

const propTypes = {
  email: PropType.string,
  password: PropType.string,
  loading: PropType.bool,
  fullName: PropType.string,
  handleChange: PropType.func,
  handleSubmit: PropType.func,
  errorMsg: PropType.string,
  errors: PropType.func,
  handleBlur: PropType.func,
  state: PropType.func,
};

const SignUpForm = ({
  email,
  password,
  fullName,
  handleChange,
  handleSubmit,
  loading,
  errorMsg,
  errors,
  state,
  handleBlur
}) => (
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
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail"
              name="email"
              type="email"
              onChange={handleChange}
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
              onChange={handleChange}
              value={password}
              error={showInvalidInputError(
                'password',
                errors,
                state
              )}
              onBlur={handleBlur('password')}
            />
          </Form.Group>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Full Name"
            type="text"
            name="fullName"
            onChange={handleChange}
            value={fullName}
            error={showInvalidInputError(
              'fullName',
              errors,
              state
            )}
            onBlur={handleBlur('fullName')}
          />

          <Button
            color="teal"
            fluid
            size="large"
            type="submit"
            loading={loading}
            disabled={isEnabled(errors)}
          >
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account?
        {' '}
        <Link to={'/login'}>Log in</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

SignUpForm.propTypes = propTypes;

export default SignUpForm;
