import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      <div>
        <p>Score: {data.score}</p>
        <p>Correct: {data.numCorrect}</p>
        <p>Wrong: {data.numWrong}</p>
        <p>Skipped: {data.numSkipped}</p>
      </div>
    </div>
  );
}

export default GameOverPage;
