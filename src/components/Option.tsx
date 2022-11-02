import React from "react";
import classes from "./Option.module.css";

function Option({
  children,
  onPress,
  color,
}: {
  children: React.ReactNode;
  onPress: () => void;
  color: string;
}) {
  return (
    <div
      onClick={onPress}
      className={classes.container}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}

export default Option;
