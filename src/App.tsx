import { useContext, useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/config";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ReactLoading from "react-loading";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AccountPage from "./pages/AccountPage";

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        authCtx
          .authenticate(user)
          .then((token) => {
            setWaitingForEvent(false);
          })
          .catch((error) => alert(error));
      } else {
        authCtx.logout();
        setWaitingForEvent(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
