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
        <form onSubmit={(e) => {
          e.preventDefault();
          formSubmitHandler(enteredEmail, enteredPassword);
        }}>
          <label>Email</label>
          <input value={enteredEmail} onBlur={emailInputTouchedHandler} onChange={emailValueChangeHandler} />
          {!isLogin && <input value={enteredConfirmEmail} onBlur={confirmEmailTouchedHandler} onChange={confirmEmailChangeHandler} />}
          <br></br>
          <label>Password</label>
          <input value={enteredPassword} onBlur={passwordInputTouchedHandler} onChange={passwordValueChangeHandler} />
          {!isLogin && <input value={enteredConfirmPassword} onBlur={confirmPasswordTouchedHandler} onChange={confirmPasswordChangeHandler} />}
          <button>{isLogin ? "Log in" : "Sign up"}</button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
