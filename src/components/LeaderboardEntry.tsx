import classes from "./LeaderboardEntry.module.css";

function LeaderboardEntry( props: any )
{
  return (
    <div className={classes.row}>
      <div className={classes.position}>{props.position}</div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.score}>{props.score}</div>
    </div>
  );
}

export default LeaderboardEntry;
