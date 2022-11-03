import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import classes from "./GameOverPage.module.css";

function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(
    {} as {
      score: number;
      numCorrect: number;
      numWrong: number;
      numSkipped: number;
      penalty: boolean;
    }
  );

  useEffect(() => {
    const dataFS = location.state?.data;
    if (!dataFS) {
      navigate("/", { replace: true });
    } else {
      setData(dataFS);
    }
  }, [location.state?.data, navigate]);
  return (
    <div className={classes.outerContainer}>
      <div className={classes.scoreBreakdownOuterContainer}>
        <h1>Game Over</h1>
        <div className={classes.scoreTextContainer}>
          <p>Score: {data.score}</p>
        </div>
        <div className={classes.scoreDetailsContainer}>
          <p>Correct: {data.numCorrect}</p>
          <p>Wrong: {data.numWrong}</p>
          <p>Skipped: {data.numSkipped}</p>
          <p>Penalty: {data.penalty ? "-5" : "No penalty"}</p>
        </div>

        <button
          className={classes.backButton}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default GameOverPage;
