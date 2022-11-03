import InputField from "../components/InputField";
import { auth, projectFirestore } from "../firebase/config";
import useInput from "../hooks/use-input";
import { useAuthContext } from "../hooks/useAuthContext";
import classes from "./AccountPage.module.css";

function AccountPage() {
  const { user } = useAuthContext();
  const { regular: displayNameChangeInput, reset: resetDisplayName } = useInput(
    (val) => val.trim().length > 2,
    "Please provide a display name longer than 2 characters."
  );

  function setAllTouched() {
    displayNameChangeInput.inputTouchedHandler();
  }

  function submitNameChangeForm( e: any )
  {
    e.preventDefault();

    if ( formIsValid )
    {
      resetDisplayName();
      projectFirestore.collection("users").doc(user?.uid!).set(
        { displayName: displayNameChangeInput.value },
        { merge: true }
      );
    } 
    else
    {
      // ???
      setAllTouched();
    }
  }

  const formIsValid = displayNameChangeInput.isValid;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <div className={classes.detailsContainer}>
          <p><strong>Current display name: </strong>{user?.displayName}</p>
          <p><strong>Email: </strong>{user?.email}</p>
        </div>

        <form className={classes.actualForm}
          onSubmit={ (e) => submitNameChangeForm( e ) }
        >
          <InputField label="Display Name" valueInput={displayNameChangeInput} />
          <button
            className={`${classes.saveChangesBtn} ${
              !formIsValid ? classes.disabledBtn : ""
            }`}
          >
            Save Changes
          </button>
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
