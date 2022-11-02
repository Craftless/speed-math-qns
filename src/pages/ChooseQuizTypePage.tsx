import { Link } from "react-router-dom";

function ChooseQuizTypePage() {
  return (
    <div>
      <Link to="/quiz" state={{ type: "timed" }}>
        Timed Trial
      </Link>
      <Link to="/quiz" state={{ type: "unlimited" }}>Unlimited Mode</Link>
    </div>
  );
}

export default ChooseQuizTypePage;
