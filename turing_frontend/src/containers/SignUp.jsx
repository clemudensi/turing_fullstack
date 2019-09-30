import React, { useState, useEffect } from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import { connect } from 'react-redux';
import { signUp } from '../actions/signup';

const validate = (email, password, fullName) =>{
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
    fullName: fullName.length === 0
  };
};

const SignUp = (props) => {
  const {
    signUp,
    signup,
    history,
    location: {state},
    // location: {state: {previousPage}},
    signup: {
      data: {
        success
      }
    }
  } = props;

  const [inputs, setInputs] = useState(
    {
      email: '',
      password: '',
      fullName: '',
      loading: false,
      error: false,
      attemptedInput: {
        email: true,
        password: true,
        fullName: true,
      }
    });
  const [attemptedInput, setAttemptedInput] = useState( {
    email: true,
    password: true,
    fullName: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const handleChange = (event, { name, value }) => {
    event.persist();
    setInputs({ ...inputs, [name]: value });
  };

  const { email, password, fullName } = inputs;

  const handleBlur = (field) => () => {
    setAttemptedInput({ attemptedInput: { [field] : true } });
  };

  // User login
  const handleSubmit = async e => {
    e.preventDefault();

    //button loading set to true
    setLoading({ loading: true });

    //dispatch login props
    await signUp(
      email,
      password,
      fullName
    );
  };

  useEffect(() => {
    if(signup.data.success === true){
      setError('');
      history.push(state.previousPage || state || "/");
    } else {
      (setError(signup.data.msg));
      setLoading(false)
    }
  }, [success]);

  const errors = validate(email, password, fullName);

  return (
    <SignUpForm
      email={email}
      password={password}
      fullName={fullName}
      loading={loading}
      handleSubmit={handleSubmit}
      token={signup}
      errors={errors}
      state={inputs}
      handleChange={handleChange}
      handleBlur={handleBlur}
      errorMsg={error}
    />
  );
};

export default connect(
  ({ signup }) => ({ signup }),
  { signUp }
)(SignUp)