import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import classes from "./RegularHeader.module.css";

function RegularHeader() {
  const [hasClicked, setHasClicked] = useState(false);
  const { logout, error } = useLogout();
  return (
    <div className={classes.outerContainer}>
      <div className={classes.headerContainer}>
        <Link to="/" className={classes.header}>Speed Math</Link>
      </div>
      <div className={classes.linksContainer}>
        <ul>
          <li>
            <Link to="/quiz" className={classes.link}>Start quiz</Link>
          </li>
          <li>
            <Link to="/leaderboard" className={classes.link}>Leaderboard</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/account" className={classes.link}>Account</Link>
          </li>
          <li>
            <button
              onClick={() => { logout(); }}
              className={classes.logoutButton}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RegularHeader;
