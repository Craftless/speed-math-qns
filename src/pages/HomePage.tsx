import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <h2>Statistics</h2>
    <div className={classes.outerContainer}>
      <div className={classes.statsTable}>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Games played</strong>
          <p className={classes.statsData}>25</p>
        </div>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Total users</strong>
          <p className={classes.statsData}>{"TODO: make this retrieve from firebase?"}</p>
        </div>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Your average score</strong>
        <p className={classes.statsData}>(PLACEHOLDER) 88%</p>
        </div>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Your leaderboard position</strong>
          <p className={classes.statsData}>(PLACEHOLDER) 7</p>
        </div>
      </div>
      <br />
      <div className={classes.miniLeaderboard}>
        <h2>Top 5</h2>
        
      </div>
      <br />

      <div className="LeaderboardHome">
      </div>
    </div>
  );
}

export default HomePage;
