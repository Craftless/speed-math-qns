import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { projectFirestore } from "../firebase/config";
import classes from "./HomePage.module.css";

function HomePage() {
  const [totalUsers, setTotalUsers] = useState(NaN as number);

  useEffect(() => {
    (async () => {
      const stats = (
        await projectFirestore.collection("stats").doc("homePageStats").get()
      ).data();
      setTotalUsers(stats!.totalUsers);
    })();
  }, []);

  return (
    <div className={classes.outerContainer}>
      <h2>Statistics</h2>
      <div className={classes.statsTable}>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Games played</strong>
          <p className={classes.statsData}>25</p>
        </div>
        <div className={classes.statsTab}>
          {totalUsers ? (
            <>
              <strong className={classes.statsLabel}>Total users</strong>
              <p className={classes.statsData}>{totalUsers}</p>
            </>
          ) : (
            <LoadingSpinner width={20} height={20} borderWidth={4} />
          )}
        </div>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>Your average score</strong>
          <p className={classes.statsData}>(PLACEHOLDER) 88%</p>
        </div>
        <div className={classes.statsTab}>
          <strong className={classes.statsLabel}>
            Your leaderboard position
          </strong>
          <p className={classes.statsData}>(PLACEHOLDER) 7</p>
        </div>
      </div>
      <br />
      <div className={classes.miniLeaderboard}>
        <h2>Top 5</h2>
      </div>
      <br />

      <div className="LeaderboardHome"></div>
    </div>
  );
}

export default HomePage;
