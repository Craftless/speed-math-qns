import classes from "./LeaderboardEntry.module.css";

function LeaderboardEntry({ position, name, score }: {position: number, name: string, score: number})
{
  return (
    <div className={classes.row}>
      <div className={classes.position}>{position}</div>
      <div className={classes.name}>{name}</div>
      <div className={classes.score}>{score}</div>
    </div>
  );
}

export default LeaderboardEntry;
