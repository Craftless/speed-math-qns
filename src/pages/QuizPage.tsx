import firebase from "firebase/compat/app";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import QuizComponent from "../components/QuizComponent";
import QuizHeader from "../components/QuizHeader";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { generateQuestion } from "../util/math";
import classes from "./QuizPage.module.css";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("" as "timed" | "unlimited");
  const [gameReady, setGameReady] = useState(false);
  const [currentQC, setCurrentQC] = useState(
    null! as {
      qn: string;
      answer: number;
      answerChosenHandler: (type: "correct" | "wrong" | "skipped") => void;
    }
  );
  const [qnNumber, setQnNumber] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [score, setScore] = useState(0);
  const [numSkipped, setNumSkipped] = useState(0);
  const maxTTQns = 10;

  const { user } = useAuthContext();

  const answerChosenHandler = useCallback(
    (type: "correct" | "wrong" | "skipped") => {
      switch (type) {
        case "correct":
          setNumCorrect((cur) => cur + 1);
          setScore((cur) => cur + 1);
          break;
        case "wrong":
          setNumWrong((cur) => cur + 1);
          setScore((cur) => cur - 1);
          break;
        case "skipped":
          setNumSkipped((cur) => cur + 1);
          break;
      }
      incrementQnNumber();
    },
    []
  );

  const generateQuizComponent = useCallback(() => {
    let answer = 0.5;
    let qn = "You should not be seeing this";
    let tries = 0;
    while (answer % 1 !== 0) {
      const { question, finalAnswer } = generateQuestion(
        Math.max(Math.floor(qnNumber / 4), 1)
      );
      answer = finalAnswer;
      qn = question;
      tries++;
      if (tries > 10) break;
    }
    return {
      qn,
      answer,
      answerChosenHandler,
    };
  }, [answerChosenHandler, qnNumber]);

  function incrementQnNumber() {
    setQnNumber((cur) => cur + 1);
  }

  useEffect(() => {
    const type: "timed" | "unlimited" = location.state?.type;
    if (!type) {
      navigate("/", { replace: true });
    }
    setGameType(type);
    setGameReady(true);
    setCurrentQC(generateQuizComponent());
  }, [generateQuizComponent, location.state?.type, navigate]);

  const gameOver = useCallback(async () => {
    setGameReady(false);
    await projectFirestore
      .collection("userData")
      .doc(user!.uid)
      .set(
        {
          totalWrong: firebase.firestore.FieldValue.increment(numWrong),
          totalCorrect: firebase.firestore.FieldValue.increment(numCorrect),
          totalSkipped: firebase.firestore.FieldValue.increment(numSkipped),
          totalScore: firebase.firestore.FieldValue.increment(score),
          totalGamesPlayed: firebase.firestore.FieldValue.increment(1),
        },
        { merge: true }
      );
    await projectFirestore
      .collection("stats")
      .doc("homePageStats")
      .update({
        totalGamesPlayed: firebase.firestore.FieldValue.increment(1),
      });
    navigate("/gameOver", {
      state: {
        data: {
          numCorrect,
          numWrong,
          numSkipped,
          score,
        },
      },
      replace: true,
    });
  }, [navigate, numCorrect, numSkipped, numWrong, score, user]);

  useEffect(() => {
    if (qnNumber <= maxTTQns || gameType === "unlimited") {
      setCurrentQC(generateQuizComponent());
    } else {
      gameOver();
    }
  }, [qnNumber, gameOver, gameType, generateQuizComponent]);

  return !gameReady ? (
    <div className={classes.outerContainer}>
      <LoadingSpinner width={100} height={100} borderWidth={25} />
    </div>
  ) : (
    <>
      <QuizHeader
        type={gameType}
        qnNumber={qnNumber}
        timeRemaining={5}
        onEnd={() => {}}
        maxQnNumber={10}
      />
      <div className={classes.outerContainer}>
        {currentQC ? (
          <QuizComponent
            qn={currentQC.qn}
            ans={currentQC.answer}
            onOver={currentQC.answerChosenHandler}
            stats={{ numCorrect, numWrong, numSkipped, score }}
          />
        ) : null}
      </div>
    </>
  );
}

export default QuizPage;
