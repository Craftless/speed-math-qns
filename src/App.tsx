import "./App.css";
// import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Provider } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import RegularHeader from "./components/RegularHeader";
import AccountPage from "./pages/AccountPage";
import AuthPage from "./pages/AuthPage";
import ChooseQuizTypePage from "./pages/ChooseQuizTypePage";
import GameOverPage from "./pages/GameOverPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QuizPage from "./pages/QuizPage";
import { store } from "./store/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

function Root() {
  const { user, authIsReady } = useAuthContext();
  const location = useLocation();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {location.pathname !== "/quiz" && user && <RegularHeader />}
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
            {user && (
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            )}
            {user && <Route path="/account" element={<AccountPage />} />}
            {user && <Route path="/quiz" element={<QuizPage />} />}
            {user && <Route path="/gameOver" element={<GameOverPage />} />}
            {user && (
              <Route path="/chooseQuizType" element={<ChooseQuizTypePage />} />
            )}
          </Routes>
        </>
      )}
      {!authIsReady && (
        <div className="outerContainer">
          <LoadingSpinner width={75} height={75} borderWidth={10} />
        </div>
      )}
    </div>
  );
}

export default App;
