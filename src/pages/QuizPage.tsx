import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import QuizHeader from "../components/QuizHeader";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { generateQuestion, operators, randomNumberRange } from "../util/math";
import firebase from "firebase/compat/app";
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
  const maxTTQns = 10;

  const { user } = useAuthContext();

  function incrementQnNumber() {
    setQnNumber((cur) => cur + 1);
  }

  useEffect(() => {
    const type: "timed" | "unlimited" = location.state?.type;
    if (!type) {
      navigate("/");
    }
    setGameType(type);
    setGameReady(true);
    setCurrentQC(generateQuizComponent());
  }, []);

  async function gameOver() {
    await projectFirestore.collection("userData").doc(user!.uid).update({
      totalWrong: firebase.firestore.FieldValue.increment(numWrong),
      totalCorrect: firebase.firestore.FieldValue.increment(numCorrect),
      totalSkipped: firebase.firestore.FieldValue.increment(numSkipped),
      // totalScore: firebase.firestore.FieldValue.increment()
    });
  }

  function answerChosenHandler(type: "correct" | "wrong" | "skipped") {
    switch (type) {
      case "correct":
        setNumCorrect((cur) => cur + 1);
        break;
      case "wrong":
        setNumWrong((cur) => cur + 1);
        break;
      case "skipped":
        setNumSkipped((cur) => cur + 1);
        break;
    }
    if (gameType != "unlimited") {
      if (qnNumber < maxTTQns) {
        incrementQnNumber();
        setCurrentQC(generateQuizComponent());
      } else {
        gameOver();
      }
    }
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
      <QuizHeader
        type={gameType}
        qnNumber={qnNumber}
        timeRemaining={5}
        onEnd={() => {}}
        maxQnNumber={10}
      />
      <div className={classes.outerContainer}>{currentQC}</div>
    </>
  );
}

export default QuizPage;
