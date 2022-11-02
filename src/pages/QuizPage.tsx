import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("" as "timed" | "unlimited");
  const [gameReady, setGameReady] = useState(false);
  const [currentQC, setCurrentQC] = useState(null! as JSX.Element);

  useEffect(() => {
    const type: "timed" | "unlimited" = location.state?.type;
    if (!type) {
      // navigate("/");
    }
    setGameType(type);
    setGameReady(true);
    setCurrentQC(generateQuizComponent());
  }, [])

  function generateQuizComponent() {
    // 
    return <QuizComponent qn="5 + 5" ans={10} query={5} />
  }



  return <p>{currentQC}</p>
}

export default QuizPage;