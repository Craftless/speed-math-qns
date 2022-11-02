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
      <h2 id="StatsHeader">
        Statistics
      </h2>

      <div class="StatisticsTable">
        <div class="GameCountTab">
          <div class="GameCountStats">
            25
          </div>
          <div class="GamesCount">
            <strong>
              Games played 
            </strong>
          </div>
        </div>
        <div class="TotalUsersTab">
          <div class="TotalUsersStats">
            75
          </div>
          <div class="TotalUsers">
            <strong>
              Total users 
            </strong> 
          </div>
        </div>
        <div class="AverageScoreTab">
          <div class="AverageScoreStats">
            88%
          </div>
          <div class="AverageScore">
            <strong>
              Your score 
            </strong>
          </div>
        </div>
        <div class="LeaderboardPosTab">
          <div class="LeaderboardPosStats">
            7
          </div>
          <div class="LeaderboardPos">
            <strong>
              Your leaderboard position 
            </strong>
          </div>
        </div>
      </div>
      <br>

      <h2>
      Leaderboard
      </h2>
      <br>

      <div class="LeaderboardHome">
      </div>
    </div>
  );
}

export default HomePage;
