import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.statsTable}>
        <div className={classes.statsTab}>
          <p className={classes.statsData}>25</p>
          <strong className={classes.statsLabel}>Games played</strong>
        </div>
        <div className={classes.statsTab}>
          <p className={classes.statsData}>{"TODO: make this retrieve from firebase?"}</p>
          <strong className={classes.statsLabel}>Total users</strong>
        </div>
        <div className={classes.statsTab}>
        <p className={classes.statsData}>(PLACEHOLDER) 88%</p>
          <strong className={classes.statsLabel}>Your average score</strong>
        </div>
        <div className={classes.statsTab}>
          <p className={classes.statsData}>(PLACEHOLDER) 7</p>
          <strong className={classes.statsLabel}>Your leaderboard position</strong>
        </div>
      </div>
      <br />

      <h2>
      Leaderboard
      </h2>
      <br />

      <div className="LeaderboardHome">
      </div>
    </div>
  );
}

export default HomePage;
