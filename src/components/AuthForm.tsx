import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";
import { createUser, logIn } from "../util/auth";
import classes from "./AuthForm.module.css";

function AuthForm() {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmail,
    inputTouchedHandler: emailInputTouchedHandler,
    valueChangeHandler: emailValueChangeHandler,
    enteredConfirmValue: enteredConfirmEmail,
    confirmFieldIsValid: confirmEmailIsValid,
    confirmFieldHasError: confirmEmailHasError,
    confirmValueChangeHandler: confirmEmailChangeHandler,
    confirmInputTouchedHandler: confirmEmailTouchedHandler,
  } = useInput(
    (val) => val.includes("@"),
    "Please provide a valid email address."
  );

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPassword,
    inputTouchedHandler: passwordInputTouchedHandler,
    valueChangeHandler: passwordValueChangeHandler,
    enteredConfirmValue: enteredConfirmPassword,
    confirmFieldIsValid: confirmPasswordIsValid,
    confirmFieldHasError: confirmPasswordHasError,
    confirmValueChangeHandler: confirmPasswordChangeHandler,
    confirmInputTouchedHandler: confirmPasswordTouchedHandler,
  } = useInput(
    (val) => val.trim().length > 6,
    "Please provide a password longer than 6 characters."
  );

  const formIsValid =
    emailIsValid &&
    (confirmEmailIsValid || isLogin) &&
    passwordIsValid &&
    (confirmPasswordIsValid || isLogin);

  function setAllTouched() {
    emailInputTouchedHandler();
    confirmEmailTouchedHandler();
    passwordInputTouchedHandler();
    confirmPasswordTouchedHandler();
  }

  async function formSubmitHandler(email: string, password: string) {
    resetEmail();
    resetPassword();
    let user;
    setWaitingForResponse(true);
    if (isLogin) {
      user = await logIn(email.trim(), password.trim(), (error) => {
        alert(`Error: ${error.code}: ${error.message}`);
        setWaitingForResponse(false);
      });
      navigate("/");
    } else {
      user = await createUser(email.trim(), password.trim(), (error) => {
        alert(`Error: ${error.code}: ${error.message}`);
        setWaitingForResponse(false);
      });
    }
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <h1 className={classes.loginFormTitle}>Speed Math!</h1>
        <h4 className={classes.loginFormSubTitle}>Sign up</h4>
        <div className={classes.formRow}>
          <label className={classes.formLabel}>Email Address</label>
          <input
            className={classes.formInput}
            value={enteredEmail}
            onBlur={emailInputTouchedHandler}
            onChange={emailValueChangeHandler}
          />
        </div>
        {!isLogin && (
          <div className={classes.formRow}>
            <label className={classes.formLabel}>Confirm Email Address</label>
            <input
              className={classes.formInput}
              value={enteredConfirmEmail}
              onBlur={confirmEmailTouchedHandler}
              onChange={confirmEmailChangeHandler}
            />
          </div>
        )}
        <div className={classes.formRow}>
          <label className={classes.formLabel}>Password</label>
          <input
            className={classes.formInput}
            value={enteredPassword}
            onBlur={passwordInputTouchedHandler}
            onChange={passwordValueChangeHandler}
          />
        </div>
        {!isLogin && (
          <div className={classes.formRow}>
            <label className={classes.formLabel}>Confirm Password</label>
            <input
              className={classes.formInput}
              value={enteredConfirmPassword}
              onBlur={confirmPasswordTouchedHandler}
              onChange={confirmPasswordChangeHandler}
            />
          </div>
        )}
        <button
          onClick={() => {
            if (formIsValid) {
              formSubmitHandler(enteredEmail, enteredPassword);
            }
          }}
          className={classes.signupButton}
        >
          {isLogin ? "Log in" : "Sign up"}
        </button>
        <button
          onClick={() => {
            switchAuthModeHandler();
          }}
        >
          {isLogin ? "Sign up instead" : "Log in instead"}
        </button>
        <button
          onClick={() => {
            alert(auth.currentUser?.email);
          }}
        >
          CLick
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
