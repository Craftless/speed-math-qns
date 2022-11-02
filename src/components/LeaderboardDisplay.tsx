import classes from "./LeaderboardDisplay.module.css";

function LeaderboardDisplay() {
  return (
    <>
      <h2>Leaderboard</h2>

      <div id="container">
        <div className="row">
          <div className="Position">1</div>
          <div className="name">Player1</div>
          <div className="score">430</div>
        </div>

        <div className="row">
          <div className="Position">2</div>
          <div className="name">Player2</div>
          <div className="score">580</div>
        </div>

        <div className="row">
          <div className="Position">3</div>
          <div className="name">Player3</div>
          <div className="score">310</div>
        </div>

        <div className="row">
          <div className="Position">4</div>
          <div className="name">Player4</div>
          <div className="score">640</div>
        </div>

        <div className="row">
          <div className="Position">5</div>
          <div className="name">Player5</div>
          <div className="score">495</div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardDisplay;
