import React from "react";
import classes from "./Option.module.css";

function Option({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default Option;
