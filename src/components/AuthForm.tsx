import { buildTimeValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import classes from "./AuthForm.module.css";
import InputField from "./InputField";
import LoadingSpinner from "./LoadingSpinner";

// oh god
const blacklist: string[] = [
  "porn",
  "mom",
  "mother",
  "mudder",
  "shit",
  "fuck",
  "boobs",
  "pussy",
  "dick",
  "penis"
];

function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const {
    regular: emailRegular,
    confirm: emailConfirm,
    reset: resetEmail,
  } = useInput(
    (val) => val.includes("@"),
    "Please provide a valid email address."
  );

  const {
    regular: passwordRegular,
    confirm: passwordConfirm,
    reset: resetPassword,
  } = useInput(
    (val) => val.trim().length > 6,
    "Please provide a password longer than 6 characters."
  );

  function validateDisplayName( val: string ): boolean
  {
    // All inputs are invalid till proven otherwise

    // Check for length
    if ( val.trim().length < 2 ) return false;

    for ( var blockedword of blacklist )
    {
      if ( val.includes( blockedword ) ) return false;
    }

    return true;
  }

  const { regular: displayNameRegular, reset: resetDisplayName } = useInput(
    (val) => validateDisplayName( val ),
    "Please provide a display name longer than 2 characters, and does not include vulgarities."
  );

  const formIsValid =
    emailRegular.isValid &&
    (emailConfirm.isValid || isLogin) &&
    passwordRegular.isValid &&
    (passwordConfirm.isValid || isLogin) &&
    (displayNameRegular.isValid || isLogin);

  function setAllTouched() {
    emailRegular.inputTouchedHandler();
    emailConfirm.inputTouchedHandler();
    passwordRegular.inputTouchedHandler();
    passwordConfirm.inputTouchedHandler();
    displayNameRegular.inputTouchedHandler();
  }

  const { login, isPending: loginIsPending, error: loginError } = useLogin();
  const {
    signup,
    isPending: signupIsPending,
    error: signupError,
  } = useSignup();

  async function formSubmitHandler(email: string, password: string) {
    resetEmail();
    resetPassword();
    if (isLogin) {
      await login(email.trim(), password.trim());
      navigate("/");
    } else {
      await signup(email.trim(), password.trim(), displayNameRegular.value);
    }
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetEmail();
    resetPassword();
    resetDisplayName();
  };

  return loginIsPending || signupIsPending ? (
    <div className={classes.outerContainer}>
      <LoadingSpinner height={200} width={200} borderWidth={10} />
    </div>
  ) : (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <h1 className={classes.loginFormTitle}>Speed Math!</h1>
        <h4 className={classes.loginFormSubTitle}>
          {isLogin ? "Log in" : "Sign up"}
        </h4>
        <form // Using a form for enter key behaviour
          className={classes.actualForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (formIsValid) {
              formSubmitHandler(emailRegular.value, passwordRegular.value);
            } else {
              setAllTouched();
            }
          }}
        >
          {!isLogin && (
            <InputField valueInput={displayNameRegular} label="Display Name" />
          )}
          <InputField valueInput={emailRegular} label="Email Address" />
          {!isLogin && (
            <InputField
              valueInput={emailConfirm}
              label="Confirm Email Address"
            />
          )}
          <InputField
            valueInput={passwordRegular}
            label="Password"
            isPassword
          />
          {!isLogin && (
            <InputField
              valueInput={passwordConfirm}
              label="Confirm Password"
              isPassword
            />
          )}
          <button
            className={`${classes.signupButton} ${
              !formIsValid ? classes.disabledBtn : ""
            }`}
          >
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => {
            switchAuthModeHandler();
          }}
          className={classes.switchAuthModeBtn}
        >
          {isLogin ? "Sign up instead" : "Log in instead"}
        </button>
        {loginError && <p>{loginError}</p>}
        {signupError && <p>{signupError}</p>}
      </div>
    </div>
  );
}

export default AuthForm;
