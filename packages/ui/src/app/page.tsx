"use client";

import Image from "next/image";
import styles from "./page.module.css";
import RepoField from "./RepoField";
import AccordionComp from "./Accordion";

export default function Home() {
  return (
    <div className={styles.content}>
      <Image src="/logo.svg" alt="logo" width="143" height="44" />
      <main className={styles.main}>
        <RepoField field="Head" entry="read me" branch="master" />
        <AccordionComp />
      </main>
    </div>
  );
}
