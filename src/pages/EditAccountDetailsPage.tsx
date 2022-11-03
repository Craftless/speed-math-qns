import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import useInput from "../hooks/use-input";
import { useAuthContext } from "../hooks/useAuthContext";
import { updateUserProfile } from "../util/auth";
import classes from "./EditAccountDetails.module.css";

function EditAccountDetailsPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
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

  const formIsValid = displayNameRegular.isValid;
  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form
          className={classes.actualForm}
          onSubmit={async (e) => {
            e.preventDefault();
            if (formIsValid) {
              resetDisplayName();
              await updateUserProfile(user!, {
                displayName: displayNameRegular.value,
              });
              await user!.updateEmail(emailRegular.value);
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
        </form>
      </div>
    </div>
  );
}

export default EditAccountDetailsPage;
