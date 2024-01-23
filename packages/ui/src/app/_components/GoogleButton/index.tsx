import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import googleIcon from "../../_assets/google.svg";

interface GoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function GoogleButton({
  className,
  text,
  ...rest
}: GoogleButtonProps) {
  return (
    <button
      className={clsx(className, styles.button, "text-style-p")}
      {...rest}
    >
      <Image src={googleIcon} alt="google icon" />
      {text}
    </button>
  );
}
