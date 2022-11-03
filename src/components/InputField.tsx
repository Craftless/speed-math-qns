import { ChangeEventHandler, FocusEventHandler } from "react";
import classes from "./InputField.module.css";

function InputField({
  label,
  isPassword,
  valueInput,
}: {
  label: string;
  isPassword?: boolean;
  valueInput: {
    value: string;
    isValid: boolean;
    hasError: boolean;
    valueChangeHandler: ChangeEventHandler<HTMLInputElement>;
    inputTouchedHandler: FocusEventHandler<HTMLInputElement>;
    finalMessage: string;
  };
}) {
  const {
    value,
    hasError,
    valueChangeHandler,
    inputTouchedHandler,
    finalMessage,
  } = valueInput;
  return (
    <div className={classes.formRow}>
      <div className={classes.wordsContainer}>
        <label className={classes.formLabel}>{label}</label>
        {hasError && <p>{finalMessage}</p>}
      </div>
      <input
        className={`${classes.formInput} ${hasError ? classes.error : ""}`}
        value={value}
        onBlur={inputTouchedHandler}
        onChange={valueChangeHandler}
        type={isPassword ? "password" : "text"}
        contentEditable={false}
      />
    </div>
  );
}

export default InputField;
