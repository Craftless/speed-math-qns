import LeaderboardDisplay from "../components/LeaderboardDisplay";
import classes from "./LeaderboardPage.module.css";

function LeaderboardPage() {
  return (
    <div className={classes.mainContainer}>
      <LeaderboardDisplay />
    </div>
  );
}

export default LeaderboardPage;
