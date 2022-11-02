import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.StatisticsTable}>
        <div className={classes.GameCountTab}>
          <div className={classes.GameCountStats}>
            25
          </div>
          <div className={classes.GamesCount}>
            <strong>
              Games played 
            </strong>
          </div>
        </div>
        <div className={classes.TotalUsersTab}>
          <div className={classes.TotalUsersStats}>
            75
          </div>
          <div className={classes.TotalUsers}>
            <strong>
              Total users 
            </strong> 
          </div>
        </div>
        <div className={classes.AverageScoreTab}>
          <div className={classes.AverageScoreStats}>
            88%
          </div>
          <div className={classes.AverageScore}>
            <strong>
              Your score 
            </strong>
          </div>
        </div>
        <div className={classes.LeaderboardPosTab}>
          <div className={classes.LeaderboardPosStats}>
            7
          </div>
          <div className={classes.LeaderboardPos}>
            <strong>
              Your leaderboard position 
            </strong>
          </div>
        </div>
      </div>
      <br />

      <h2>
      Leaderboard
      </h2>
      <br />

      <div className={classes.LeaderboardHome}>
      </div>
    </div>
  );
}

export default HomePage;
