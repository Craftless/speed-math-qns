import React from "react";
import classes from "./Option.module.css";

function Option({ children, onPress }: { children: React.ReactNode, onPress: () => void }) {
  return <div onClick={onPress}>{children}</div>;
}

export default Option;
