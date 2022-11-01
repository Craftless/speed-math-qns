import { Link } from "react-router-dom";
import "./HomePage.module.css";

function HomePage() {
  return (
    <div className="outerContainer">
      <span>Home</span>
      &nbsp;
      <Link to="/auth">Login</Link>
      &nbsp;
      <Link to="/login">Sign Up!</Link>
      <h2 id="StatsHeader">Statistics</h2>
      <div className="StatisticsTable">
        <br />
        <div className="GamesCount">
          <strong>55 Games played</strong>
        </div>
        <div className="TotalUsers">
          <strong>75 total users</strong>
        </div>
        <div className="AverageScore">
          <strong>88% Your score</strong>
        </div>
        <div className="LeaderboardPos">
          <strong>7 Your leaderboard position</strong>
        </div>
      </div>
      <br />
      <h2>Leaderboard</h2>
      <br />
      <div className="LeaderboardHome"></div>
    </div>
  );
}

export default HomePage;
