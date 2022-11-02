import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import classes from "./SharedHeader.module.css";

function QuizHeader({
  type,
  qnNumber,
  maxQnNumber,
  timeRemaining,
  onEnd,
}: {
  type: "timed" | "unlimited";
  qnNumber: number;
  maxQnNumber?: number;
  timeRemaining: number;
  onEnd: () => void;
}) {
  function getTypeName(type: "timed" | "unlimited") {
    switch (type) {
      case "timed":
        return "Timed Trial";
      case "unlimited":
        return "Unlimited Mode";
    }
  }
  return (
    <div className={classes.outerContainer}>
      <div className={classes.headerContainer}>
        <Link to="/" className={classes.header}>
          Speed Math
        </Link>
      </div>
      <div className={classes.linksContainer}>
        <ul>
          <li>
            <p>
              {getTypeName(type)} - {qnNumber}
              {type == "timed" ? ` of ${maxQnNumber!}` : ""}
            </p>
          </li>
        </ul>
        <ul>
          <li>
            <p>0.05s Remaining</p>
          </li>
          <li>
            <button
              onClick={() => {
                onEnd();
              }}
              className={classes.logoutButton}
            >
              End Quiz
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuizHeader;
