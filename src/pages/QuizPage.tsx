import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import QuizHeader from "../components/QuizHeader";
import { generateQuestion, operators, randomNumberRange } from "../util/math";
import classes from "./QuizPage.module.css";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("" as "timed" | "unlimited");
  const [gameReady, setGameReady] = useState(false);
  const [currentQC, setCurrentQC] = useState(null! as JSX.Element);
  const [qnNumber, setQnNumber] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [numSkipped, setNumSkipped] = useState(0);

  function incrementQnNumber() {
    setQnNumber((cur) => cur + 1);
  }

  useEffect(() => {
    const type: "timed" | "unlimited" = location.state?.type;
    if (!type) {
      // navigate("/");
    }
    setGameType(type);
    setGameReady(true);
    setCurrentQC(generateQuizComponent());
  }, []);

  function answerChosenHandler(type: "correct" | "wrong" | "skipped") {
    switch (type) {
      case "correct":
        break;
      case "wrong":
        break;
      case "skipped":
        break;
    }
    incrementQnNumber();
    setCurrentQC(generateQuizComponent());
  }

  function generateQuizComponent() {
    let answer = 0.5;
    let qn = "You should not be seeing this";
    let tries = 0;
    while (answer % 1 != 0) {
      const { question, finalAnswer } = generateQuestion(
        Math.max(Math.floor(qnNumber / 4), 1)
      );
      answer = finalAnswer;
      qn = question;
      tries++;
      if (tries > 10) break;
    }
    return <QuizComponent qn={qn} ans={answer} onOver={answerChosenHandler} />;
  }

  return (
    <>
      <QuizHeader type={"timed"} qnNumber={qnNumber} timeRemaining={5} onEnd={() => {}} maxQnNumber={10} />
      <div className={classes.outerContainer}>{currentQC}</div>
    </>
  );
}

export default QuizPage;
