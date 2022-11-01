import { ChangeEvent, ChangeEventHandler, FocusEvent, FocusEventHandler, useState } from "react";

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

  const confirmFieldIsValid =
    enteredValue === enteredConfirmValue && valueIsValid;
  const confirmFieldHasError = !confirmFieldIsValid && confirmIsTouched;

  function valueChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function inputTouchedHandler(
    event?: FocusEvent<HTMLInputElement>
  ) {
    setIsTouched(true);
  }

  function confirmValueChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredConfirmValue(event.target.value);
  }

  function confirmInputTouchedHandler(
    event?: FocusEvent<HTMLInputElement>
  ) {
    setConfirmIsTouched(true);
  }

  function reset() {
    setEnteredValue("");
    setIsTouched(false);
    setEnteredConfirmValue("");
    setConfirmIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputTouchedHandler,
    reset,
    enteredConfirmValue,
    confirmFieldIsValid,
    confirmFieldHasError,
    confirmValueChangeHandler,
    confirmInputTouchedHandler,
  };
}

export default useInput;
