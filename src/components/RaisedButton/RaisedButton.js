import React from "react";
import styles from "./RaisedButton.module.css";

export default function RaisedButton({
  size = "small",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${styles["raised-button"]} ${className} ${styles[size]}`.trim()}
      {...props}
    />
  );
}
