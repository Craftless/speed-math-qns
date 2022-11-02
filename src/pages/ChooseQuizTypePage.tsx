import { Link } from "react-router-dom";
import classes from "./ChooseQuizTypePage.module.css"

function ChooseQuizTypePage() {
  return (
    <div>
      <Link to="/quiz" state={{ type: "timed" }} className={classes.timed}>
        Timed Trial
      </Link>
      <Link to="/quiz" state={{ type: "unlimited" }} className={classes.unlimited}>Unlimited Mode</Link>
    </div>
  );
}

export default ChooseQuizTypePage;
