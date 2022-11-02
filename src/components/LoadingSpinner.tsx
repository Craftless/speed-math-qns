import classes from "./LoadingSpinner.module.css";

function LoadingSpinner({ width, height }: { width: number; height: number }) {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={classes.spinnerContainer}
    >
      <div style={{ width, height }} className={classes.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
