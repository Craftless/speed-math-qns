import { useContext, useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/config";
// import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import ReactLoading from "react-loading";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import firebase from "firebase/compat/app";
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext, AuthContextProvider } from "./store/AuthContext";
import { useLogout } from "./hooks/useLogout";
import RegularHeader from "./components/RegularHeader";

function App() {
  return <Root />;
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [waitingForEvent, setWaitingForEvent] = useState(true);

  // useEffect(() => {
  //   let unsubscribe = () => {};
  //   async function init() {
  //     await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  //     unsubscribe = auth.onAuthStateChanged((user) => {
  //       // alert(user?.email)
  //       if (user) {
  //         alert(user.email);
  //         authCtx
  //           .authenticate(user)
  //           .then(() => setWaitingForEvent(false))
  //           .catch((error: any) => alert(error));
  //       } else {
  //         // alert("LOGOUT")
  //         authCtx.logout();
  //         setWaitingForEvent(false);
  //       }
  //     });
  //   }
  //   init();
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  const { user, authIsReady } = useAuthContext();
  const { logout, error } = useLogout();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {/* <p>{String(!!user)}</p>
          <p>{user?.email}</p>
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button> */}
          <RegularHeader />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
            {user && <Route path="/leaderboard" element={<LeaderboardPage />} />}
            {user && <Route path="/account" element={<AccountPage />} />}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
