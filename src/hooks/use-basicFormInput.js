import React, { useReducer, useState } from "react";

const initialState = {
  inputValue: "",
  fieldWasTouched: false,
};
const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { inputValue: action.value, fieldWasTouched: state.fieldWasTouched };
  }
  if (action.type === "BLUR") {
    return { inputValue: state.inputValue, fieldWasTouched: true };
  }
  if (action.type === "RESET") {
    return initialState;
  }
  return initialState;
};

const useBasicFormInput = (inputValidation) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const isInputValueValid = inputValidation(inputState.inputValue);
  const inputHasError = !isInputValueValid && inputState.fieldWasTouched;

  const inputValueHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const fieldWasTouchedHandler = () => {
    dispatch({ type: "BLUR" });
  };
  const resetInput = () => {
    dispatch({ type: "RESET" });
  };

  return {
    inputValue: inputState.inputValue,
    isInputValueValid,
    inputHasError,
    inputValueHandler,
    fieldWasTouchedHandler,
    resetInput,
  };
};

export default useBasicFormInput;
