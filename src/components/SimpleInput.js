import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  //   const nameInputRef = useRef();

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid = enteredEmail.trim() !== "";
  let emailErrorMessage = "E-mail must not be empty";
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const checkEmail = () => {
    if (!enteredEmailIsValid) {
      return false;
    } else if (!re.test(enteredEmail)) {
      emailErrorMessage = "Invalid E-mail format";
      return false;
    }
    return true;
  };
  const emailInputIsInvalid = !checkEmail() && enteredEmailTouched;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;
  if (enteredNameIsValid && checkEmail()) {
    formIsValid = true;
  }
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    // nameInputRef.current.value = ''
    // Not ideal, that way will directly manipulate the DOM and its better manipulate only with React
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control ";
  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control ";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          //   ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">{emailErrorMessage}</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
