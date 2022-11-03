import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import useInput from "../hooks/use-input";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateUserProfile } from "../util/auth";
import classes from "./EditAccountDetails.module.css";

function EditAccountDetailsPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const { regular: displayNameRegular, reset: resetDisplayName } = useInput(
    (val) => val.trim().length > 2,
    "Please provide a display name longer than 2 characters.",
    user!.displayName || "None"
  );

  const {
    regular: emailRegular,
    confirm: emailConfirm,
    reset: resetEmail,
  } = useInput(
    (val) => val.includes("@"),
    "Please provide a valid email address.",
    user!.email!
  );

  function setAllTouched() {
    displayNameRegular.inputTouchedHandler();
  }

  const formIsValid =
    displayNameRegular.isValid && emailRegular.isValid && emailConfirm.isValid;
  return (
    <div className={classes.outerContainer}>
      {isPending ? (
        <LoadingSpinner width={100} height={100} borderWidth={10} />
      ) : (
        <div className={classes.formContainer}>
          <form
            className={classes.actualForm}
            onSubmit={async (e) => {
              e.preventDefault();
              if (formIsValid) {
                setIsPending(true);
                resetDisplayName();
                await Promise.all([
                  updateUserProfile(user!, {
                    displayName: displayNameRegular.value,
                  }),
                  user!.updateEmail(emailRegular.value),
                ]);
                setIsPending(false);
                navigate("/account", { replace: true });
              } else {
                setAllTouched();
              }
            }}
          >
            <InputField label="Display Name" valueInput={displayNameRegular} />
            <InputField label="Email Address" valueInput={emailRegular} />
            <InputField label="Email Address" valueInput={emailConfirm} />
            <button
              className={`${classes.saveChangesBtn} ${
                !formIsValid ? classes.disabledBtn : ""
              }`}
            >
              Save Changes
            </button>

            <button
              className={classes.backButton}
              onClick={() => {
                navigate("/account");
              }}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditAccountDetailsPage;
