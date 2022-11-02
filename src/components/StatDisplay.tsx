import LoadingSpinner from "./LoadingSpinner";
import classes from "./StatDisplay.module.css";

function StatDisplay({ value, label }: { value: number; label: string }) {
  return (
    <div className={classes.statsTab}>
      {!isNaN(value) ? (
        <>
          <p className={classes.statsData}>{value}</p>
          <p className={classes.statsLabel}>{label}</p>
        </>
      ) : (
        <LoadingSpinner width={20} height={20} borderWidth={4} />
      )}
    </div>
  );
}

export default StatDisplay;
