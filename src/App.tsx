import "./App.css";
// import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Provider } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import RegularHeader from "./components/RegularHeader";
import AuthPage from "./pages/AuthPage";
import { store } from "./store/redux/store";
import { lazy, Suspense } from "react";

const GameOverPage = lazy(() => import("./pages/GameOverPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ChooseQuizTypePage = lazy(() => import("./pages/ChooseQuizTypePage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const EditAccountDetailsPage = lazy(
  () => import("./pages/EditAccountDetailsPage")
);
const HomePage = lazy(() => import("./pages/HomePage"));

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
          <Suspense
            fallback={
              <div className="outerContainer">
                <LoadingSpinner width={75} height={75} borderWidth={10} />
              </div>
            }
          >
            {location.pathname !== "/quiz" && user && <RegularHeader />}
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
              {user && (
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              )}
              {user && <Route path="/account" element={<AccountPage />} />}
              {user && (
                <Route
                  path="/editaccount"
                  element={<EditAccountDetailsPage />}
                />
              )}
              {user && <Route path="/quiz" element={<QuizPage />} />}
              {user && <Route path="/gameOver" element={<GameOverPage />} />}
              {user && (
                <Route
                  path="/chooseQuizType"
                  element={<ChooseQuizTypePage />}
                />
              )}
            </Routes>
          </Suspense>
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
