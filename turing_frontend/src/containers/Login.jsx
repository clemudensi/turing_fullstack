import React, {useState, useEffect} from 'react';
import LoginForm from '../components/auth/LoginForm';
import { connect } from 'react-redux';
import { userLogin } from '../actions/login';

const validate = (email, password) =>{
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
  };
};

const Login = (props) => {
  const {
    userLogin,
    user_login,
    history,
    location: {state},
    user_login: {
      data: {
        success
      }
    }
  } = props;

  const [inputs, setInputs] = useState(
    {
      email: '',
      password: '',
      loading: false,
      error: true,
      attemptedInput: {
        email: true,
        password: true
      }
    });
  const [, setAttemptedInput] = useState( {
      email: true,
      password: true
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const handleOnChange = (event, { name, value }) => {
    event.persist();
    setInputs({ ...inputs, [name]: value });
  };

  const { email, password } = inputs;

  const handleBlur = (field) => () => {
    setAttemptedInput({ attemptedInput: { [field] : true } });
  };

  // User login
  const handleSubmit = async e => {
    e.preventDefault();

    //button loading set to true
    setLoading(true);

    //dispatch login props
    await userLogin(
      email,
      password,
    );
  };

  useEffect(() => {
    if(props.user_login.data.success === true){
      setError('');
      history.push(state || "/");
    } else {
      (setError(user_login.data.msg));
      setLoading(false)
    }
  }, [success]);

  const errors = validate(email, password);

  return (
    <LoginForm
      email={email}
      password={password}
      loading={loading}
      handleOnChange={handleOnChange}
      handleSubmit={handleSubmit}
      token={user_login}
      errors={errors}
      state={inputs}
      handleBlur={handleBlur}
      errorMsg={error}
      previousPage={state}
    />
  );
};

export default connect(
  ({ user_login }) => ({ user_login }),
  { userLogin }
)(Login)