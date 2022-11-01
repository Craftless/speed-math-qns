import { useContext, useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/config";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ReactLoading from "react-loading";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import firebase from "firebase/compat/app";

function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    async function init() {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          alert(user.email);
          authCtx
            .authenticate(user)
            .then(() => setWaitingForEvent(false))
            .catch((error) => alert(error));
        } else {
          authCtx.logout();
          setWaitingForEvent(false);
        }
      });
    }
    init();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      {/* {auth.currentUser && (
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      )}
      {!auth.currentUser && (
        <Routes>
          <Route
            path="*"
            element={
              auth.currentUser ? <AccountPage /> : <Navigate to="/auth" />
            }
          /> */}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      {/* )} */}
    </div>
  );
}

export default App;
