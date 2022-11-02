import "./HomePage.module.css";

function HomePage() {
  return (
    <div className="outerContainer">
      <div className="StatisticsTable">
        <div className="GameCountTab">
          <div className="GameCountStats">
            25
          </div>
          <div className="GamesCount">
            <strong>
              Games played 
            </strong>
          </div>
        </div>
        <div className="TotalUsersTab">
          <div className="TotalUsersStats">
            75
          </div>
          <div className="TotalUsers">
            <strong>
              Total users 
            </strong> 
          </div>
        </div>
        <div className="AverageScoreTab">
          <div className="AverageScoreStats">
            88%
          </div>
          <div className="AverageScore">
            <strong>
              Your score 
            </strong>
          </div>
        </div>
        <div className="LeaderboardPosTab">
          <div className="LeaderboardPosStats">
            7
          </div>
          <div className="LeaderboardPos">
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

      <div className="LeaderboardHome">
      </div>
    </div>
  );
}

export default HomePage;
