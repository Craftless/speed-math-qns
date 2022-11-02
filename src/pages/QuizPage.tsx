import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { generateQuestion, operators, randomNumberRange } from "../util/math";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("" as "timed" | "unlimited");
  const [gameReady, setGameReady] = useState(false);
  const [currentQC, setCurrentQC] = useState(null! as JSX.Element);
  const [qnNumber, setQnNumber] = useState(1);

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

  function answerChosenHandler(isCorrect: boolean) {
    if (isCorrect) {
    } else {
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
    return (
      <QuizComponent
        qn={qn}
        ans={answer}
        onOver={answerChosenHandler}
      />
    );
  }

  return <p>{currentQC}</p>;
}

export default QuizPage;
