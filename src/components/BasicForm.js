import useBasicFormInput from "../hooks/use-basicFormInput";

const BasicForm = (props) => {
  const {
    inputValue: firstName,
    isInputValueValid: isFirstNameValid,
    inputHasError: firstNameHasError,
    inputValueHandler: firstNameHandler,
    fieldWasTouchedHandler: firstNameTouchedHandler,
    resetInput: firstNameReset,
  } = useBasicFormInput((value) => value.trim() !== "");
  const {
    inputValue: lastName,
    isInputValueValid: isLastNameValid,
    inputHasError: lastNameHasError,
    inputValueHandler: lastNameHandler,
    fieldWasTouchedHandler: lastNameTouchedHandler,
    resetInput: lastNameReset,
  } = useBasicFormInput((value) => value.trim() !== "");
  const {
    inputValue: email,
    isInputValueValid: isEmailValid,
    inputHasError: emailHasError,
    inputValueHandler: emailHandler,
    fieldWasTouchedHandler: emailTouchedHandler,
    resetInput: emailReset,
  } = useBasicFormInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) {
    formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!isFirstNameValid || isLastNameValid || isEmailValid) {
      return;
    }
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    emailReset();
    firstNameReset();
    lastNameReset();
  };
  const firstNameInputClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            onChange={firstNameHandler}
            type="text"
            id="first-name"
            value={firstName}
            onBlur={firstNameTouchedHandler}
          />
          {firstNameHasError && <p> first name must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            onChange={lastNameHandler}
            type="text"
            id="last-name"
            value={lastName}
            onBlur={lastNameTouchedHandler}
          />
          {lastNameHasError && <p> last name must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          onChange={emailHandler}
          type="text"
          id="email"
          value={email}
          onBlur={emailTouchedHandler}
        />
        {emailHasError && <p> enter a valid email format</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
