import { useEffect } from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";
import LoadingSpinner from "../components/LoadingSpinner";
import { projectFirestore } from "../firebase/config";
import classes from "./LeaderboardPage.module.css";

class PlayerRepresentation {
  name: string;
  score: number;

  constructor( name:string, score: number ) {
    this.name = name;
    this.score = score;
  }
}

// Unfortunately, I have to use regular arrays here
// because states would "exceed the maximum update depth"
var leaderboardArray: JSX.Element[];
var players: PlayerRepresentation[];

function LeaderboardPage()
{
  useEffect( () =>
  {
    // 1. Empty the arrays
    leaderboardArray = [];
    players = [];

    // 1. Fetch data from Firebase
    //await projectFirestore.collection( "users" ).doc

    // 2. Construct array of PlayerRepresentations?
    players = [ new PlayerRepresentation( "a", 523 ), new PlayerRepresentation( "de", 444 ) ];

    // 3. Sort by score
    players.sort( (a, b) => { return b.score - a.score; } );

    // 4. Add <LeaderboardEntry /> elements
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
          {
            leaderboardArray ? leaderboardArray :
            // Can someone help me center this 
            <LoadingSpinner width={20} height={20} borderWidth={4} />
          }
        </div>
        <p>If leaderboard fails to load, press "Leaderboard" on the title bar again :)</p>
      </div>
    </>
  );
}

export default LeaderboardPage;
