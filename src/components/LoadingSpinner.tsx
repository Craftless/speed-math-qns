import classes from "./LoadingSpinner.module.css";

function LoadingSpinner({ width, height }: { width: number; height: number }) {
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
