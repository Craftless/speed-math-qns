import { useContext, useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase/config";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ReactLoading from 'react-loading';

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
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  ) : (
    <ReactLoading />
  );
}

export default App;
