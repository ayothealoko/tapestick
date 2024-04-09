"use client";
import { useLoggedInRedirect } from "@/_hooks/isLoggedInHook";

import styles from "./page.module.css";
import NeutralButtonLink from "./_components/NeutralButtonLink";
import ButtonLink from "./_components/ButtonLink";
import Inbox from "./_components/Inbox";

export default function Home() {
  useLoggedInRedirect(false, "/login");
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonRow}>
        <NeutralButtonLink text="new contact" href="#" />
        <NeutralButtonLink text="new deal" href="#" />
        <ButtonLink text="new customer" href="#" />
      </div>
      <Inbox />
    </div>
  );
}
