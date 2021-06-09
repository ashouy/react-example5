import React, { useState } from "react";

const useBasicFormInput = (inputValidation) => {
  const [inputValue, setInputValue] = useState("");
  const [fieldWasTouched, setFieldWasTouched] = useState(false);

  const isInputValueValid = inputValidation(inputValue);
  const inputHasError = !isInputValueValid && fieldWasTouched;

  const inputValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const fieldWasTouchedHandler = () => {
    setFieldWasTouched(true);
  };
  const resetInput = () => {
    setFieldWasTouched(false);
    setInputValue("");
  };

  return {
    inputValue,
    isInputValueValid,
    inputHasError,
    inputValueHandler,
    fieldWasTouchedHandler,
    resetInput,
  };
};

export default useBasicFormInput;
