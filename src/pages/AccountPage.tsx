import AccountView from "../components/AccountView";
import { useAuthContext } from "../hooks/useAuthContext";

function AccountPage() {
  const { user } = useAuthContext();
  return (
    <>
      <p>Account Page</p>
      <p>Display Name: {user?.displayName ?? "None"}</p>
    </>
    // <AccountView />
    // <p>jfsdiajpfos</p>
  );
}

export default AccountPage;
