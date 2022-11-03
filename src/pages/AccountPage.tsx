import { auth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import classes from "./AccountPage.module.css";

function AccountPage() {
  const { user } = useAuthContext();

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <div className={classes.detailsContainer}>
          <div className={classes.detailsInnerContainer}>
            <p style={{ textAlign: "right" }}>Current display name: </p>
            <p className={classes.nameText}>{user?.displayName}</p>
          </div>
          <div className={classes.detailsInnerContainer}>
            <p style={{ textAlign: "right" }}>Email: </p>
            <p className={classes.emailText}>{user?.email}</p>
          </div>
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
