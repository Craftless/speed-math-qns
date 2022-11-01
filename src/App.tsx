import { useContext, useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/config";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ReactLoading from 'react-loading';
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

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

  return waitingForEvent ? (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" />
        <Route path="/signup" />
      </Routes>
    </div>
  ) : (
    <ReactLoading />
  );
}

export default App;
