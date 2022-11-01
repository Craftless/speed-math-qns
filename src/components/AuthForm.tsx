import { useContext, useState } from "react";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";
import { createUser, logIn } from "../util/auth";
import classes from "./AuthForm.module.css"

function AuthForm() {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
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

        <form onSubmit={(e) => {
          e.preventDefault();
          formSubmitHandler(enteredEmail, enteredPassword);
        }}>
          <label className={classes.formLabel}>Email</label>
          <input className={classes.formInput} value={enteredEmail} onBlur={emailInputTouchedHandler} onChange={emailValueChangeHandler} placeholder="Enter email..." />
          &nbsp;
          {!isLogin && <input className={classes.formInput} value={enteredConfirmEmail} onBlur={confirmEmailTouchedHandler} onChange={confirmEmailChangeHandler} placeholder="Confirm email..." />}

          <br />

          <label className={classes.formLabel}>Password</label>
          <input className={classes.formInput} value={enteredPassword} onBlur={passwordInputTouchedHandler} onChange={passwordValueChangeHandler} placeholder="Enter password..." />
          &nbsp;
          {!isLogin && <input className={classes.formInput} value={enteredConfirmPassword} onBlur={confirmPasswordTouchedHandler} onChange={confirmPasswordChangeHandler} placeholder="Confirm email..." />}
          <br />
          <button className={classes.signupButton}>{isLogin ? "Log in" : "Sign up"}</button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
