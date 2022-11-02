import {
  ChangeEvent, FocusEvent, useState
} from "react";

function useInput(
  validationFunc: (value: string) => boolean,
  invalidMessage: string
) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const [enteredConfirmValue, setEnteredConfirmValue] = useState("");
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);

  const valueIsValid = validationFunc(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const fieldsMatch = enteredValue === enteredConfirmValue;
  const confirmFieldIsValid = fieldsMatch && valueIsValid;
  const confirmFieldHasError = !confirmFieldIsValid && confirmIsTouched;

  const finalMessage = !fieldsMatch
    ? "Please ensure the fields match"
    : invalidMessage;

  function valueChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function inputTouchedHandler(event?: FocusEvent<HTMLInputElement>) {
    setIsTouched(true);
  }

  function confirmValueChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredConfirmValue(event.target.value);
  }

  function confirmInputTouchedHandler(event?: FocusEvent<HTMLInputElement>) {
    setConfirmIsTouched(true);
  }

  function reset() {
    setEnteredValue("");
    setIsTouched(false);
    setEnteredConfirmValue("");
    setConfirmIsTouched(false);
  }

  return {
    regular: {
      value: enteredValue,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputTouchedHandler,
      finalMessage: invalidMessage,
    },
    confirm: {
      value: enteredConfirmValue,
      isValid: confirmFieldIsValid,
      hasError: confirmFieldHasError,
      valueChangeHandler: confirmValueChangeHandler,
      inputTouchedHandler: confirmInputTouchedHandler,
      finalMessage,
    },
    reset,
  };
}

export default useInput;
