import { Link } from "react-router-dom";
import classes from "./ChooseQuizTypePage.module.css";

function ChooseQuizTypePage() {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.textContainer}>
        <p>Choose your preferred quiz type:</p>
      </div>
      <div className={classes.btnsContainer}>
        <Link
          to="/quiz"
          state={{ type: "timed" }}
          className={`${classes.timed} ${classes.btn}`}
        >
          Timed Trial
        </Link>
        <p style={{ flex: 0.3, display: "flex", justifyContent: "center", alignItems: "center" }}>OR</p>
        <Link
          to="/quiz"
          state={{ type: "unlimited" }}
          className={`${classes.unlimited} ${classes.btn}`}
        >
          Unlimited Mode
        </Link>
      </div>
      <div style={{ flex: 0.2 }} />
    </div>
  );
}

export default ChooseQuizTypePage;
