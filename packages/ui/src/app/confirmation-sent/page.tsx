import clsx from "clsx";
import Link from "next/link";
import styles from "./page.module.css";
import { BigButtonLink } from "../_components/BigButtonLink";

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>Sign up complete!</h1>
      <div className={styles.contentWrapper}>
        <p className="text-style-h3">
          Check your email for a verification link
        </p>
        <BigButtonLink text="Login" href="./login" />
      </div>
    </div>
  );
}
