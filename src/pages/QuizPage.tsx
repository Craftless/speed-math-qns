import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const type = location.state?.type;
    if (!type) {
      navigate("/");
    }
  }, [])
  
  return <p>Quiz</p>
}

export default QuizPage;