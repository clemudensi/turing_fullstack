/** Disable the button, check if any error is true*/

const isEnabled = (errors) => (Object.keys(errors).some((x) => errors[x]));

const showInvalidInputError = (field, errors, state) => {
  const hasError = errors[field];
  const shouldShow = state.attemptedInput[field];
  return hasError ? shouldShow : false;
};

export {
  isEnabled,
  showInvalidInputError
};
