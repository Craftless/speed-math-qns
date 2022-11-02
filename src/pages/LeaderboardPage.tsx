import { useEffect } from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";
import classes from "./LeaderboardPage.module.css";

class PlayerRepresentation {
  name: string;
  score: number;

  constructor( name:string, score: number ) {
    this.name = name;
    this.score = score;
  }
}

var leaderboardArray: JSX.Element[];
var players: PlayerRepresentation[];

function LeaderboardPage()
{
  useEffect( () =>
  {
    leaderboardArray = [];
    // 1. Fetch data from Firebase

    // 2. Construct array of PlayerRepresentations?
    players = [ new PlayerRepresentation( "a", 523 ), new PlayerRepresentation( "de", 444 ) ];

    // 3. Sort by score???
    players.sort( (a, b) => { return b.score - a.score; } );

    // 4. Add <LeaderboardEntry />s
    for ( var i: number = 1; i <= players.length; i++ )
    {
      var player: PlayerRepresentation = players[i-1];
      leaderboardArray.push( <LeaderboardEntry position={i} name={player.name} score={player.score} /> );
    }
  }, [players] );

  return (
    <>
      <h2 className={classes.leaderboardLabel}>Leaderboard</h2>
      <div className={classes.mainContainer}>
        <div className={classes.leaderboardContainer}>
          { leaderboardArray }
        </div>
      </div>
    </>
  );
}

export default LeaderboardPage;
