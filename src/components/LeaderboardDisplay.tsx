import classes from "./LeaderboardDisplay.module.css";

function LeaderboardDisplay()
{
  return (
    <h2>Leaderboard</h2>

<div id="container">
    <div class="row">
        <div class="Position">1</div><div class="name">Player1</div><div class="score">430</div>
    </div>
    
    <div class="row">
        <div class="Position">2</div><div class="name">Player2</div><div class="score">580</div>
    </div>
    
    <div class="row">
         <div class="Position">3</div><div class="name">Player3</div><div class="score">310</div>
    </div>
    
    <div class="row">
         <div class="Position">4</div><div class="name">Player4</div><div class="score">640</div>
    </div>
    
    <div class="row">
         <div class="Position">5</div><div class="name">Player5</div><div class="score">495</div>
    </div>
</div>
  );
}

export default LeaderboardDisplay;
