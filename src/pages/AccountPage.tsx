import { useState } from "react";
import InputField from "../components/InputField";
import { auth, projectFirestore } from "../firebase/config";
import useInput from "../hooks/use-input";
import { useAuthContext } from "../hooks/useAuthContext";
import EditableLabel from "react-inline-editing";
import classes from "./AccountPage.module.css";
import { updateUserProfile } from "../util/auth";

function AccountPage() {
  const { user } = useAuthContext();

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <div className={classes.detailsContainer}>
          <p>
            <strong>Current display name: </strong>
            {user?.displayName}
          </p>
          <p>
            <strong>Email: </strong>
            {user?.email}
          </p>
        </div>
        <div className={classes.btnsContainer}>
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
            className={classes.genericBtn}
            onClick={async () => {
              try {
                await user!.delete();
              } catch (e: any) {
                alert(e.code + e.message);
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
