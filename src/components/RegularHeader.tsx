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
        <p className={classes.header}>Speed Math</p>
      </div>
      <div className={classes.linksContainer}>
        <ul>
          <li>
            <Link to="/quiz">Start quiz</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <button
              onClick={() => {
                logout();
              }}
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
