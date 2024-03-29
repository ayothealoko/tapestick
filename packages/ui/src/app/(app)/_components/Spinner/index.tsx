import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import spinnerDark from "@/_assets/spinner_dark.svg";
import spinnerLight from "@/_assets/spinner_light.svg";

export interface SpinnerProps {
  type: "light" | "dark";
}

let spinnerImg: Record<SpinnerProps["type"], string> = {
  light: spinnerLight,
  dark: spinnerDark,
};

export default function Spinner({ type }: SpinnerProps) {
  let spinImg = spinnerImg[type];
  return (
    <Image className={styles.spin} src={spinImg} alt="spinner loading..." />
  );
}
