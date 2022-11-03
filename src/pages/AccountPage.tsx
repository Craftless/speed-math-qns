import { reauthenticateWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import firebase from "firebase/compat/app";
import classes from "./AccountPage.module.css";

function AccountPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function tryDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const password = prompt("What is your password?");
        if (!password) return;
        const credentials = firebase.auth.EmailAuthProvider.credential(user!.email!, password);
        await user?.reauthenticateWithCredential(credentials)
        await user!.delete();
      } catch (e: any) {
        alert(e.code + e.message);
      }
    }
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsInnerContainer}>
            <p style={{ textAlign: "right", fontWeight: "bold" }}>Current display name: </p>
            <p className={classes.nameText}>{user?.displayName}</p>
          </div>
          <div className={classes.detailsInnerContainer}>
            <p style={{ textAlign: "right", fontWeight: "bold" }}>Email: </p>
            <p className={classes.emailText}>{user?.email}</p>
          </div>
        </div>

        <div className={classes.btnsContainer}>
          <button
            className={`${classes.genericBtn} ${classes.editBtn}`}
            onClick={() => {
              navigate("/editaccount");
            }}
          >
            Edit Account
          </button>

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
          <button
            className={classes.deleteAccountButton}
            onClick={tryDeleteAccount}
          >
            ⚠️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
