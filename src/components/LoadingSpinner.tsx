import classes from "./LoadingSpinner.module.css";

function LoadingSpinner({
  width,
  height,
  borderWidth,
}: {
  width: number;
  height: number;
  borderWidth: number;
}) {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={classes.spinnerContainer}
    >
      <div style={{ width, height, borderWidth }} className={classes.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
