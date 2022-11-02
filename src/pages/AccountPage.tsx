import AccountView from "../components/AccountView";
import InputField from "../components/InputField";
import { auth, projectFirestore } from "../firebase/config";
import useInput from "../hooks/use-input";
import { useAuthContext } from "../hooks/useAuthContext";
import classes from "./AccountPage.module.css";

function AccountPage() {
  const { user } = useAuthContext();
  const { regular: displayNameRegular, reset: resetDisplayName } = useInput(
    (val) => val.trim().length > 2,
    "Please provide a display name longer than 2 characters."
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
          onSubmit={(e) => {
            e.preventDefault();
            if (formIsValid) {
              projectFirestore.collection("users").doc(user?.uid!).update({
                displayName: displayNameRegular.value,
              });
            } else {
              setAllTouched();
            }
          }}
        >
          <InputField label="Display Name" valueInput={displayNameRegular} />
          <button className={`${classes.saveChangesBtn} ${
            !formIsValid ? classes.disabledBtn : ""
          }`}>Save Changes</button>
        </form>
        <button
          className={classes.genericBtn}
          onClick={async () => {
            try {
              await auth.sendPasswordResetEmail(user?.email!);
              alert("Email sent!");
            } catch (e: any) {
              alert(e.code + e.message);
            }
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
